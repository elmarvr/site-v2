<script setup lang="ts">
const { data } = await useAsyncData(async () => {
  return queryContent("introduction").findOne();
});
</script>

<template>
  <Spotify />
</template>
