import { createResolver, defineNuxtModule } from "nuxt/kit";
import fs from "node:fs";
import path from "node:path";

export default defineNuxtModule((opts, nuxt) => {
  nuxt.hooks.hook("content:file:beforeParse", ({ file }) => {
    if (!file.id.endsWith(".md")) {
      return;
    }

    const resolver = createResolver(import.meta.url);

    file.body = file.body.replace(regex, (match, filepath, name) => {
      filepath = path.resolve("./", filepath.trim());
      name = name ? name.trim() : null;

      const file = resolver.resolve(filepath);
      if (!file) {
        return match;
      }

      const content = fs.readFileSync(file, "utf-8");

      if (!content) {
        return match;
      }

      const ext = path.extname(filepath);

      return `\`\`\`${ext.slice(1)} [${name}]\n${content}\`\`\`\n\n`;
    });
  });
});

const regex = /<<<\s*([^[]+)\s*\[([^\]]+)?\]\s*/g;
