<script setup lang="ts">
definePageMeta({
  pageTransition: false,
});

const { locale } = useI18n();
const route = useRoute();

const collection = computed(() => {
  return `snippets_${locale.value}` as const;
});

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection(collection.value).path(route.path).first();
});

const { data: surrounding } = await useAsyncData(
  `${route.path}_surrounding`,
  () => {
    return queryCollectionItemSurroundings(collection.value, route.path, {
      fields: ["title", "path"],
    }).order("date", "DESC");
  }
);
</script>

<template>
  <div v-if="page">
    <PageMeta :item="page" />
    <div class="pb-3">
      <h2 class="inline-flex text-lg">
        {{ page.title }}
      </h2>
      <p class="text-muted-foreground">
        {{ $d(page.date, { dateStyle: "medium" }) }}
      </p>
    </div>

    <ContentRenderer
      :value="page"
      class="prose prose-zinc prose-invert max-w-none"
    />

    <div class="flex justify-between pt-5">
      <SnippetLink
        v-if="surrounding?.[0]"
        :to="surrounding[0].path"
        type="previous"
      >
        {{ surrounding[0].title }}
      </SnippetLink>

      <SnippetLink
        v-if="surrounding?.[1]"
        :to="surrounding[1].path"
        type="next"
      >
        {{ surrounding[1].title }}
      </SnippetLink>
    </div>
  </div>
</template>
