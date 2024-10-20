<script setup lang="ts">
definePageMeta({
  pageTransition: false,
});

const { locale, defaultLocale } = useI18n();

const route = useRoute();

const localePath = useLocalePath();

const path = computed(() => localePath(route.path, defaultLocale));

const [prev, next] = await queryContent("snippets")
  .only(["_path", "title"])
  .sort({ date: -1 })
  .findSurround(path.value);

const { data } = useAsyncData("snippet-slug", async () => {
  return queryContent("snippets", ...(route.params.slug as string[]))
    .locale(locale.value)
    .findOne();
});
</script>

<template>
  <div class="pt-8">
    <MarkdownContent :content="data" />

    <div class="flex justify-between pt-5">
      <PageLink v-if="prev" :value="prev" type="previous" />
      <PageLink v-if="next" :value="next" type="next" />
    </div>
  </div>
</template>
