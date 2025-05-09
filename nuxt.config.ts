import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxthub/core",
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxtjs/i18n",
    "reka-ui/nuxt",
    "@vueuse/nuxt",
  ],
  devtools: { enabled: true },
  runtimeConfig: {},
  future: { compatibilityVersion: 4 },
  compatibilityDate: "2025-03-01",
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    prerender: {
      routes: ["/en", "/nl"],
      crawlLinks: true,
    },
  },

  hub: {},
  i18n: {
    locales: ["en", "nl"],
    defaultLocale: "en",
    strategy: "prefix",
  },
  fonts: {
    families: [
      {
        name: "Inconsolata",
        provider: "google",
        weights: [400, 500, 600],
      },
    ],
  },
  reka: {
    prefix: "Reka",
  },
  icon: {
    mode: "svg",
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: "one-dark-pro",
        },
      },
    },
    renderer: {
      anchorLinks: false,
    },
  },
});
