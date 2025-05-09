import { defineConfig } from "cva";
import { twMerge } from "tailwind-merge";

export const { cva, compose, cx } = defineConfig({
  hooks: {
    onComplete(className) {
      return twMerge(className);
    },
  },
});

export const focusRing = cva({
  base: "focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background outline-none",
});

export type { ClassValue } from "cva";
