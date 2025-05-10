// @lib: esnext,dom
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono();

const routes = app.post(
  "/upload",
  zValidator(
    "form",
    z
      .object({
        file: z.instanceof(Blob),
        image: z.instanceof(Blob),
      })
      .partial()
  ),
  (c) => {
    const { file, image } = c.req.valid("form");

    //Upload the file...

    return c.json({ success: true });
  }
);

export type AppType = typeof routes;
