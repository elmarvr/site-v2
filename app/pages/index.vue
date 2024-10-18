<script setup lang="ts">
const { data } = await useAsyncData(async () => {
  return queryContent("introduction").findOne();
});
</script>

<template>
  <UiProse>
    <ContentRendererMarkdown v-if="data" :value="data" />
  </UiProse>
  <Spotify />
</template>
