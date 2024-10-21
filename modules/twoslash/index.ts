import { createResolver, defineNuxtModule } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "twoslash",
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    nuxt.hook("mdc:configSources", async (sources: string[]) => {
      sources.push(resolver.resolve("./runtime/mdc.config"));
    });
  },
});
