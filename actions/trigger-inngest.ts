"use client";

import { Inngest } from "inngest";

const inngest = new Inngest({
  id: "reho-app",
});

export async function triggerVideoGeneration(seriesId: string) {
  await inngest.send({
    name: "video/generate",
    data: { seriesId },
  });
  console.log("Triggered video generation for series:", seriesId);
}
