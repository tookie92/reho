import { Inngest } from "inngest";
import { serve } from "inngest/next";
import { supabaseAdmin } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";

const deepgramApiKey = process.env.DEEPGRAM_API_KEY!;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseStorage = createClient(supabaseUrl, supabaseServiceKey);

interface VoiceMapping {
  voiceId: string;
  deepgramVoice: string;
}

const voiceMappings: VoiceMapping[] = [
  { voiceId: "aura-2-odysseus-en", deepgramVoice: "aura-2-odysseus-en" },
  { voiceId: "aura-2-thalia-en", deepgramVoice: "aura-2-thalia-en" },
  { voiceId: "aura-2-amalthea-en", deepgramVoice: "aura-2-amalthea-en" },
  { voiceId: "aura-2-andromeda-en", deepgramVoice: "aura-2-andromeda-en" },
  { voiceId: "aura-2-apollo-en", deepgramVoice: "aura-2-apollo-en" },
];

function getDeepgramVoice(voiceId: string | null): string {
  const mapping = voiceMappings.find((v) => v.voiceId === voiceId);
  return mapping?.deepgramVoice || "aura-2-odysseus-en";
}

export const inngest = new Inngest({
  id: "reho-app",
});

interface VideoGenerationEvent {
  data: {
    seriesId: string;
  };
}

interface ScriptScene {
  sceneNumber: number;
  duration: number;
  imagePrompt: string;
  voiceoverText: string;
}

interface VideoScript {
  title: string;
  totalDuration: number;
  scenes: ScriptScene[];
}

function getNumScenes(duration: string | null): number {
  if (duration === "60-70") {
    return 6;
  }
  return 5;
}

function getSceneDuration(duration: string | null): number {
  if (duration === "60-70") {
    return 11;
  }
  return 7;
}

function getTotalDuration(duration: string | null): number {
  if (duration === "60-70") {
    return 65;
  }
  return 35;
}

export const generateVideo = inngest.createFunction(
  { id: "generate-video", name: "Generate Video" },
  { event: "video/generate" },
  async ({ event, step }) => {
    const { seriesId } = event.data;

    // Step 1: Fetch Series data from Supabase
    const series = await step.run("fetch-series-data", async () => {
      const { data, error } = await supabaseAdmin
        .from("series")
        .select("*")
        .eq("id", seriesId)
        .single();

      if (error) {
        throw new Error(`Failed to fetch series: ${error.message}`);
      }

      console.log("Fetched series:", data);
      return data;
    });

    // Step 2: Generate Video Script using AI
    const script = await step.run("generate-video-script", async () => {
      console.log("Generating video script using Gemini AI...");

      const videoDuration = series.video_duration || "30-50";
      const numScenes = getNumScenes(videoDuration);
      const sceneDuration = getSceneDuration(videoDuration);
      const totalDuration = getTotalDuration(videoDuration);
      const niche = series.niche_title || series.niche_id || "general";
      const videoStyle = series.video_style_name || "realistic";

      const prompt = `Generate a natural video script for a ${totalDuration} second video about "${niche}" with ${videoStyle} style.

Return ONLY valid JSON with this exact structure (no markdown, no additional text):
{
  "title": "Video Title",
  "totalDuration": ${totalDuration},
  "scenes": [
    {
      "sceneNumber": 1,
      "duration": ${sceneDuration},
      "imagePrompt": "Detailed image generation prompt for this scene",
      "voiceoverText": "Natural conversational voiceover text for this scene"
    }
  ]
}

Requirements:
- Create exactly ${numScenes} scenes
- Total duration should be around ${totalDuration} seconds
- Each scene should be around ${sceneDuration} seconds
- Voiceover text must be conversational, natural, and suitable for voiceover
- Image prompts should be descriptive and work with ${videoStyle} style
- The script should have a clear beginning, middle, and end
- Focus on engaging content about "${niche}"
- Return ONLY the JSON, no explanations or markdown`;

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || "";

      let cleanJson = content.trim();
      if (cleanJson.startsWith("```json")) {
        cleanJson = cleanJson.slice(7);
      } else if (cleanJson.startsWith("```")) {
        cleanJson = cleanJson.slice(3);
      }
      if (cleanJson.endsWith("```")) {
        cleanJson = cleanJson.slice(0, -3);
      }
      cleanJson = cleanJson.trim();

      const parsedScript = JSON.parse(cleanJson) as VideoScript;
      
      console.log("Generated script:", JSON.stringify(parsedScript, null, 2));
      return parsedScript;
    });

    // Step 3: Generate Voice using TTS model
    const voiceData = await step.run("generate-voice", async () => {
      console.log("Generating voice using Deepgram TTS...");

      const voiceId = series.voice_id;
      const languageId = series.language_id || "en-US";
      const deepgramVoice = getDeepgramVoice(voiceId);

      const allVoiceoverText = script.scenes
        .map((scene) => scene.voiceoverText)
        .join(" ");

      console.log(`Using voice: ${deepgramVoice}, language: ${languageId}`);
      console.log(`Total text length: ${allVoiceoverText.length} characters`);

      const response = await fetch(`https://api.deepgram.com/v1/speak?model=${deepgramVoice}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${deepgramApiKey}`,
        },
        body: JSON.stringify({
          text: allVoiceoverText,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Deepgram TTS error: ${response.status} - ${errorText}`);
      }

      const contentType = response.headers.get("content-type") || "audio/wav";
      const audioBuffer = await response.arrayBuffer();
      const audioArray = new Uint8Array(audioBuffer);

      const videoId = crypto.randomUUID();
      const extension = contentType.includes("mp3") ? "mp3" : "wav";
      const audioPath = `videos/${seriesId}/${videoId}/voiceover.${extension}`;

      const { error: uploadError } = await supabaseStorage.storage
        .from("video-assets")
        .upload(audioPath, audioArray, {
          contentType: contentType,
          upsert: true,
        });

      if (uploadError) {
        console.error("Failed to upload audio to storage:", uploadError);
        throw new Error(`Failed to upload audio: ${uploadError.message}`);
      }

      const { data: urlData } = supabaseStorage.storage
        .from("video-assets")
        .getPublicUrl(audioPath);

      const audioUrl = urlData.publicUrl;
      const duration = script.totalDuration;

      console.log(`Voice generated successfully. URL: ${audioUrl}, Duration: ${duration}s`);

      return {
        audioUrl,
        duration,
        voiceModel: deepgramVoice,
        language: languageId,
        contentType,
      };
    });

    // Step 4: Generate Caption from script text
    const caption = await step.run("generate-caption", async () => {
      console.log("Generating caption from script...");

      const fullText = script.scenes
        .map((scene) => scene.voiceoverText)
        .join(" ");

      let cumulativeTime = 0;
      const timestamps: Array<{ word: string; start: number; end: number }> = [];

      const words = fullText.split(/\s+/);
      const avgWordsPerSecond = 2.5;
      const avgWordDuration = 1 / avgWordsPerSecond;

      for (const word of words) {
        timestamps.push({
          word,
          start: cumulativeTime,
          end: cumulativeTime + avgWordDuration,
        });
        cumulativeTime += avgWordDuration;
      }

      console.log(`Caption generated: ${fullText.length} chars, ${words.length} words`);

      return {
        text: fullText,
        timestamps,
      };
    });

    // Step 5: Generate Images from prompt
    const images = await step.run("generate-images", async () => {
      console.log("Generating images...");
      // TODO: Integrate image generation (e.g., DALL-E, Stable Diffusion)
      // Use script content to generate image prompts
      return {
        images: [
          { url: "/placeholder-image-1.jpg", timestamp: 0 },
          { url: "/placeholder-image-2.jpg", timestamp: 30 },
        ],
      };
    });

    // Step 6: Save everything to database
    const savedVideo = await step.run("save-to-database", async () => {
      console.log("Saving video to database...");
      // TODO: Save all generated data to videos table
      return {
        id: "new-video-id",
        seriesId,
        script,
        voiceData,
        caption,
        images,
        status: "completed",
      };
    });

    return {
      success: true,
      videoId: savedVideo.id,
      seriesId,
    };
  }
);

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [generateVideo],
});
