//@lib: esnext,dom

declare module "@nuxt/schema" {
  interface NuxtOptions {
    i18n?: {
      locales?: string[] | { code: string }[];
      langDir?: string;
    };
  }
}
import {
  addTypeTemplate,
  createResolver,
  defineNuxtModule,
  updateTemplates,
  useLogger,
} from "@nuxt/kit";
import { readFileSync } from "fs";
import dedent from "ts-dedent";
// ---cut---
const logger = useLogger("i18n-types");
const resolver = createResolver(import.meta.url);

export default defineNuxtModule({
  meta: {
    name: "i18n-types",
  },

  async setup(options, nuxt) {
    const locales = nuxt.options.i18n?.locales ?? [];
    const langDir = nuxt.options.i18n?.langDir ?? "lang";

    nuxt.hook("builder:watch", (event, path) => {
      if (path.includes(`app/${langDir}`)) {
        updateTemplates({
          filter: (t) => t.filename === "types/i18n-types.d.ts",
        });
      }
    });

    addTypeTemplate({
      filename: "types/i18n-types.d.ts",
      getContents() {
        const t0 = performance.now();
        const messages = locales.map((locale) => {
          const code = typeof locale === "string" ? locale : locale.code;
          const file = resolver.resolve(`../app/${langDir}/${code}.json`);
          const content = readFileSync(file, "utf-8");

          return JSON.parse(content);
        });

        const ids = intersection(messages.map(Object.keys));

        const template = dedent`
          import { DefineLocaleMessage } from "vue-i18n";
          declare module 'vue-i18n' {
            export type MessageId = 
              | ${ids.map((id) => `"${id}"`).join("\n    | ")};
    
            interface DefineLocaleMessage {
              ${ids.map((id) => `"${id}": string`).join("\n")}
            }
          }`;

        const t1 = performance.now();
        logger.success(`I18n types generated in ${Math.round(t1 - t0)}ms`);

        return template;
      },
    });
  },
});

function intersection(arrays: string[][]) {
  return arrays.reduce((a, b) => a.filter((c) => b.includes(c)));
}
