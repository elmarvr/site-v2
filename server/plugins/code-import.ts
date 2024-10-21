import fs from "fs";
import path from "path";

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook("content:file:beforeParse", (file) => {
    if (file._id.endsWith(".md")) {
      const lines = file.body.split("\n");

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]!;

        if (line.startsWith("<<<")) {
          const [_, file, ...meta] = line.split(" ");

          if (!file) {
            continue;
          }

          const ext = file.split(".").pop();
          const content = `// @filename: ${path.basename(
            file
          )}\n${fs.readFileSync(file, "utf-8")}`;

          lines[i] = `\`\`\`${ext} ${meta.join(" ")}\n${content}\n\`\`\``;
        }
      }

      file.body = lines.join("\n");
    }
  });
});

// Currently resolves single-level imports. Future work: handle nested imports.
function resolveImports(dir: string, content: string) {
  const lines = content.split("\n");
  const imports = [] as string[];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;

    if (line.startsWith("import")) {
      const file = line.split("from")[1]?.replace(/['";]/g, "").trim();

      if (!file) {
        continue;
      }

      if (file.startsWith(".")) {
        const fullPath = path.join(dir, file);
        const ext = resolveFileExtension(fullPath);

        const content = fs.readFileSync(fullPath + ext, "utf-8");

        const name = path.basename(fullPath + ext);

        imports.push(
          `// @filename: ${name}\n${resolveImports(
            path.dirname(fullPath),
            content
          )}`
        );
      }
    }
  }

  return [...imports, ...lines].join("\n");
}

const resolveFileExtension = (file: string) => {
  if (file.includes(".")) {
    return "";
  }

  for (const ext of [".ts", ".tsx", ".js", ".jsx"]) {
    if (fs.existsSync(file + ext)) {
      return ext;
    }
  }

  throw new Error(`Module not found: ${file}`);
};
