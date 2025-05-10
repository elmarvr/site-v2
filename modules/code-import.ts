import fs, { readFileSync } from "fs";
import { defineNuxtModule } from "nuxt/kit";
import { join, extname, basename, dirname } from "path";

export default defineNuxtModule({
  meta: {
    name: "code-import",
  },
  setup: (opts, nuxt) => {
    nuxt.hooks.hook("content:file:beforeParse", ({ file }) => {
      if (file.id.endsWith(".md")) {
        const lines = file.body.split("\n");

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i]!;

          if (line.startsWith("<<<")) {
            const [_, path, ...meta] = line.split(" ");

            if (!path) {
              continue;
            }

            const imports = getImports(path, readFileSync(path, "utf-8"));
            const ext = extname(path);

            const template = [
              ...imports,
              { name: basename(path), content: readFileSync(path, "utf-8") },
            ]
              .map(
                ({ name, content }) =>
                  `// @filename: ${name}\n// ---cut---\n${content}`
              )
              .join("\n");

            lines[i] = `\`\`\`${ext.slice(1)} ${meta.join(
              " "
            )}\n${template}\n\`\`\``;
          }
        }

        file.body = lines.join("\n");
      }
    });
  },
});

// Currently resolves single-level imports. Future work: handle nested imports.
function getImports(path: string, content: string) {
  const imports: {
    name: string;
    content: string;
  }[] = [];

  const dir = dirname(path);

  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;

    if (line.startsWith("import")) {
      const path = line.split("from")[1]?.replace(/['";]/g, "").trim();

      if (!path) {
        continue;
      }

      if (path.startsWith(".")) {
        const fullPath = resolvePath(join(dir, path));

        const content = fs.readFileSync(fullPath, "utf-8");

        const contentImports = getImports(fullPath, content);

        imports.push(...contentImports);

        const name = basename(fullPath);

        imports.push({
          name,
          content,
        });
      }
    }
  }

  return imports;
}

function resolvePath(path: string) {
  if (fs.existsSync(path)) {
    return path;
  }

  for (const ext of [".ts", ".tsx", ".js", ".jsx"]) {
    if (fs.existsSync(path + ext)) {
      return path + ext;
    }
  }

  throw new Error(`Module not found: ${path}`);
}
