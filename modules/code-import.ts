import { defineNuxtModule } from "nuxt/kit";
import { createResolver } from "@nuxt/kit";
import path from "path";
import fs from "fs";
import { parseModule } from "magicast";

export default defineNuxtModule({
  meta: {
    name: "code-import",
  },
  setup: (opts, nuxt) => {
    nuxt.hooks.hook("content:file:beforeParse", ({ file }) => {
      const lines = file.body.split("\n");

      for (let i = 0; i <= lines.length - 1; i++) {
        const line = lines[i]!;

        if (!line.startsWith("<<<")) {
          continue;
        }

        const [_, filepath, ...meta] = line.split(" ");

        if (!filepath) {
          continue;
        }

        const modules = getModules(resolve("../", filepath));

        const last = modules[modules.length - 1]!;
        last.content = addComment(last.content, ` ---cut---`, 1);

        let content = modules.map((module) => module.content).join("\n\n");
        content = addComment(content, ` @lib: esnext,dom`);

        lines[i] = generateTemplate({
          path: filepath,
          meta,
          body: content,
        });
      }

      file.body = lines.join("\n");
    });
  },
});

function generateTemplate(file: {
  path: string;
  meta: string[];
  body: string;
}) {
  return [
    `\`\`\`${path.extname(file.path).slice(1)} ${file.meta.join(" ")}`,
    file.body,
    `\`\`\``,
  ].join("\n");
}

function getModules(filepath: string) {
  const modules: {
    path: string;
    content: string;
  }[] = [];

  let content = fs.readFileSync(filepath, "utf-8");
  content = addComment(content, ` @filename: ${path.basename(filepath)}`);

  modules.push({
    path: filepath,
    content,
  });

  const mod = parseModule(content);
  for (const $import of mod.imports.$items) {
    if ($import.from.startsWith(".")) {
      const _path = resolve(path.dirname(filepath), $import.from);
      modules.unshift(...getModules(_path));
    }
  }

  return modules;
}

function addComment(file: string, code: string, line = 0) {
  const lines = file.split("\n");
  lines.splice(line, 0, `//${code}`);
  return lines.join("\n");
}

function resolve(...paths: string[]) {
  const extensions = ["ts", "tsx"];
  const resolver = createResolver(import.meta.url);

  const filepath = resolver.resolve(...paths);

  for (const ext of extensions) {
    try {
      const result = `${filepath}.${ext}`;
      if (fs.existsSync(result)) {
        return result;
      }
    } catch (e) {
      continue;
    }
  }

  return filepath;
}
