<script setup lang="ts">
const route = useRoute();
const { t } = useI18n();

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});

function tryT(key: string | undefined, fallback: string) {
  return computed(() => (key ? t(key, fallback) : fallback));
}

const title = tryT(route.meta.title, "Site");
const description = tryT(route.meta.description, t("page.index.description"));

useSeoMeta({
  title,
  titleTemplate: "Elmar | %s",
  description,
});
</script>

<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <template v-for="link in head.link" :key="link.id">
        <Link
          :id="link.id"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>

    <Body>
      <div class="max-w-2xl mx-auto container">
        <header class="flex justify-between items-center py-3">
          <NuxtLinkLocale to="/">
            <h1 class="font-semibold">Elmar</h1>
          </NuxtLinkLocale>
          <nav>
            <ul class="flex">
              <li>
                <UiLinkButton to="/projects">
                  <Icon name="ph:brackets-curly" />
                </UiLinkButton>
              </li>
              <li>
                <UiLinkButton to="/snippets">
                  <Icon name="ph:scissors" />
                </UiLinkButton>
              </li>

              <li>
                <LocaleSelect>
                  <LocaleSelectTrigger />
                </LocaleSelect>
              </li>
            </ul>
          </nav>
        </header>

        <slot />
      </div>
    </Body>
  </Html>
</template>
