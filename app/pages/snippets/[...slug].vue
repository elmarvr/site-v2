<script setup lang="ts">
const { locale } = useI18n();
const route = useRoute();

const collection = computed(() => {
  return `snippets_${locale.value}` as const;
});

const { data: snippet } = await useAsyncData(route.path, () => {
  return queryCollection(collection.value).path(route.path).first();
});
</script>

<template>
  <div v-if="snippet">
    <div class="pb-3">
      <h2 class="inline-flex text-lg">
        {{ snippet.title }}
      </h2>
      <p class="text-muted-foreground">
        {{ $d(snippet.date, { dateStyle: "medium" }) }}
      </p>
    </div>

    <LazyContentRenderer
      :value="snippet"
      class="prose prose-zinc prose-invert"
    />
  </div>
</template>
