import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content_en: defineCollection({
      type: "page",
      source: {
        include: "en/**/*.md",
        prefix: "/en",
        exclude: ["en/projects/*.md", "en/snippets/*.md"],
      },
      schema: contentSchema(),
    }),
    content_nl: defineCollection({
      type: "page",
      source: {
        include: "nl/**/*.md",
        prefix: "/nl",
        exclude: ["nl/projects/*.md", "nl/snippets/*.md"],
      },
      schema: contentSchema(),
    }),

    projects_en: defineCollection({
      type: "data",
      source: {
        include: "en/projects/*.md",
        prefix: "/en/projects",
      },
      schema: projectSchema(),
    }),
    projects_nl: defineCollection({
      type: "data",
      source: {
        include: "nl/projects/*.md",
        prefix: "/nl/projects",
      },
      schema: projectSchema(),
    }),

    snippets_en: defineCollection({
      type: "page",
      source: {
        include: "en/snippets/*.md",
        prefix: "/en/snippets",
      },
      schema: snippetSchema(),
    }),
    snippets_nl: defineCollection({
      type: "page",
      source: {
        include: "nl/snippets/*.md",
        prefix: "/nl/snippets",
      },
      schema: snippetSchema(),
    }),
  },
});

function contentSchema() {
  return z.object({
    title: z.string(),
  });
}

function projectSchema() {
  return z.object({
    title: z.string(),
    date: z.date(),
    body: z.any(),
    url: z.string().url(),
    github: z.string().url(),
    stack: z.string().array(),
  });
}

function snippetSchema() {
  return z.object({
    title: z.string(),
    date: z.date(),
  });
}
