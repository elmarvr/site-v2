import { defineConfig } from "@nuxtjs/mdc/config";

export default defineConfig({
  shiki: {
    async setup(shiki) {
      await shiki.loadLanguage(
        import("shiki/langs/javascript.mjs"),
        import("shiki/langs/typescript.mjs"),
        import("shiki/langs/vue.mjs")
      );
    },
    transformers: async () => {
      return [
        await import("./transformer").then(({ createTransformer }) =>
          createTransformer({ throws: false })
        ),
      ];
    },
  },
});
