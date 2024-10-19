<script setup lang="ts">
const { locale, defaultLocale } = useI18n();
const route = useRoute();
const localePath = useLocalePath();

const path = computed(() => localePath(route.path, defaultLocale));

const [prev, next] = await queryContent("snippets")
  .only(["_path", "title"])
  .sort({ date: -1 })
  .findSurround(path.value);
</script>

<template>
  <ContentDoc :path="path" :query="{ where: [{ _locale: locale }] }" />

  <div class="flex justify-between">
    <PageLink v-if="prev" :value="prev" type="previous" />
    <PageLink v-if="next" :value="next" type="next" />
  </div>
</template>
