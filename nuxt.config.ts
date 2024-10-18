export default defineNuxtConfig({
  modules: [
    "@nuxthub/core",
    "@nuxt/eslint",
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "radix-vue/nuxt",
    "@nuxt/icon",
    // Auto import is apperantly broken
    "~/modules/i18n-types",
    "@nuxtjs/google-fonts",
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
    locales: [
      {
        code: "en",
        language: "en",
        file: "en.json",
      },
      {
        code: "nl",
        language: "nl",
        file: "nl.json",
      },
    ],
    strategy: "prefix_except_default",
    lazy: true,
    langDir: "lang",
    defaultLocale: "en",
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
});
