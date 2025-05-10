// @lib: esnext,dom
import { z } from "zod";

export const receiptSchema = z.object({
  name: z.string(),
  category: z.string(),
  items: z.array(
    z.object({
      amount: z.number(),
      name: z.string(),
      price: z.number(),
    })
  ),
});
