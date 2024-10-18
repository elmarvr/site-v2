<script setup lang="ts">
const route = useRoute();

const [prev, next] = await queryContent()
  .only(["_path", "title"])
  .sort({ date: -1 })
  .where({ isArchived: false })
  .findSurround(route.path);
</script>

<template>
  <!-- <ContentDoc /> -->
</template>
