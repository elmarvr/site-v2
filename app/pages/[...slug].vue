<script setup lang="ts">
const { locale } = useI18n();
const route = useRoute();

const collection = computed(() => {
  return `content_${locale.value}` as const;
});

console.log(route.path);

const { data: content } = await useAsyncData(route.path, async () => {
  return await queryCollection(collection.value).path(route.path).first();
});
</script>

<template>
  <!-- <div class="w-full flex flex-col gap-12"> -->

  <!-- <MarkdownContent :content="introduction" /> -->

  <!-- <Spotify /> -->

  <!-- <div>
      <h2 class="pb-5 text-muted-foreground">Connect</h2>
      <MarkdownContent :content="connect" />
    </div> -->
  <!-- </div> -->

  <ContentRenderer
    v-if="content"
    :value="content"
    class="prose prose-invert prose-zinc prose-h2:no-underline prose-h2:text-base prose-h2:text-muted-foreground"
  />
</template>
