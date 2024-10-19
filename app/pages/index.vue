<script setup lang="ts">
const { locale } = useI18n();
const { data } = await useAsyncData(async () => {
  return queryContent("introduction").locale(locale.value).findOne();
});
</script>

<template>
  <UiProse>
    <ContentRendererMarkdown v-if="data" :value="data" />
  </UiProse>
  <Spotify />
</template>
