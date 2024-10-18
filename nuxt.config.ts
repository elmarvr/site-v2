const i18n = {
  locales: ["en", "nl"],
  defaultLocale: "en",
};

export default defineNuxtConfig({
  modules: [
    "@nuxthub/core",
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "radix-vue/nuxt",
    "@nuxt/icon",
    "@nuxtjs/google-fonts",
    "@nuxt/content",
    "@nuxtjs/i18n",

    // Auto import is apparently broken
    "~/modules/i18n-types",
  ],
  components: [
    {
      path: "~/components/ui",
      prefix: "Ui",
    },
    {
      path: "~/components",
    },
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      helloText: "Hello from the Edge 👋",
    },
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: "2024-07-30",
  hub: {},
  eslint: {
    config: {},
  },
  i18n: {
    locales: i18n.locales.map((locale) => ({
      code: locale,
      file: `${locale}.json`,
    })),
    defaultLocale: i18n.defaultLocale,
    strategy: "prefix_except_default",
    lazy: true,
    langDir: "lang",
    baseUrl: "https://elmarvr.com",
  },
  radix: {
    prefix: "Radix",
  },
  googleFonts: {
    families: {
      Inconsolata: true,
    },
  },

  content: {
    sources: ["app/content"],
    locales: i18n.locales,
    defaultLocale: i18n.defaultLocale,
  },
});
