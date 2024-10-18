<script setup>
const route = useRoute();
const { t } = useI18n();

t("hello-world");

// const head = useLocaleHead({
//   addDirAttribute: true,
//   identifierAttribute: "id",
//   addSeoAttributes: true,
// });

// const title = computed(() => t(route.meta.title) ?? "Elmar");
</script>

<template>
  <!-- :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir" -->
  <Html>
    <Head> </Head>
    <!-- <Head>
        <Title>{{ title }}</Title>
        <template v-for="link in head.link" :key="link.id">
          <Link
            :id="link.id"
            :rel="link.rel"
            :href="link.href"
            :hreflang="link.hreflang"
          />
        </template>
        <template v-for="meta in head.meta" :key="meta.id">
          <Meta
            :id="meta.id"
            :property="meta.property"
            :content="meta.content"
          />
        </template>
      </Head> -->
    <Body>
      <header>
        <LocaleSelect>
          <LocaleSelectTrigger />
        </LocaleSelect>
      </header>

      <slot />
    </Body>
  </Html>
</template>
