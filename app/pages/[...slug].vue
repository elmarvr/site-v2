<script setup lang="ts">
const { locale } = useI18n();
const route = useRoute();

const collection = computed(() => {
  return `content_${locale.value}` as const;
});

const { data: content } = await useAsyncData(route.path, async () => {
  return await queryCollection(collection.value).path(route.path).first();
});
</script>

<template>
  <ContentRenderer
    v-if="content"
    :value="content"
    class="prose prose-invert max-w-none prose-zinc prose-h2:no-underline prose-h2:text-base prose-h2:text-muted-foreground"
  />
</template>
