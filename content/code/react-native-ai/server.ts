// @lib: esnext,dom
import { Hono } from "hono";
import { OpenAI } from "openai";
import { streamSSE } from "hono/streaming";
import { zodResponseFormat } from "openai/helpers/zod";

import { receiptSchema } from "./schema";

const openai = new OpenAI();
const app = new Hono();

app.post("/receipts/generate", async (c) => {
  const { store } = await c.req.json();
  const chatStream = await openai.chat.completions.create({
    model: "gpt-4o-2024-08-06",
    messages: [
      {
        role: "user",
        content: `Generate a receipt for my favorite store: ${store}`,
      },
    ],
    response_format: zodResponseFormat(receiptSchema, "receipt_response"),
    stream: true,
  });

  return streamSSE(c, async (stream) => {
    for await (const message of chatStream) {
      await stream.writeSSE({
        id: message.id,
        data: JSON.stringify({
          content: message.choices[0]?.delta.content,
        }),
        event: "message",
      });
    }
    await stream.writeSSE({ data: "[DONE]", event: "message" });
  });
});
