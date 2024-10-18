<script setup lang="ts">
const { data } = await useAsyncData(async () => {
  return queryContent("introduction").findOne();
});
</script>

<template>
  <ContentRendererMarkdown
    v-if="data"
    :value="data"
    class="prose prose-zinc prose-invert"
  />
</template>
