import { Inngest } from "inngest";
import { serve } from "inngest/next";

export const inngest = new Inngest({
  id: "reho-app",
});

const helloWorld = inngest.createFunction(
  { id: "hello-world", name: "Hello World" },
  { event: "test/hello.world" },
  async ({ event }) => {
    console.log("Hello from Inngest!", event.data);
    return { message: `Hello, ${event.data?.name || "World"}!` };
  }
);

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld],
});
