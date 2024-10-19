<script setup lang="ts">
const route = useRoute();

const [prev, next] = await queryContent("/snippets")
  .only(["_path", "title"])
  .sort({ date: -1 })
  .findSurround(route.path);
</script>

<template>
  <ContentDoc />

  <div class="flex justify-between">
    <PageLink v-if="prev" :value="prev" type="previous" />
    <PageLink v-if="next" :value="next" type="next" />
  </div>
</template>
