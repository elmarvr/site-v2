<script setup lang="ts">
definePageMeta({
  pageTransition: false,
});

const route = useRoute();
const { locale, defaultLocale } = useI18n();
const localePath = useLocalePath();

const path = computed(() => localePath(route.path, defaultLocale));

const [prev, next] = await queryContent("snippets")
  .only(["_path", "title"])
  .sort({ date: -1 })
  .findSurround(path.value);
</script>

<template>
  <div class="pt-8">
    <ContentDoc :path="path" :query="{ _locale: locale }" v-slot="{ doc }">
      <div class="pb-3">
        <h2 class="inline-flex text-lg">
          {{ doc.title }}
        </h2>
        <p class="text-muted-foreground">
          {{ $d(doc.date, { dateStyle: "medium" }) }}
        </p>
      </div>

      <MarkdownContent :content="doc" />
    </ContentDoc>

    <div class="flex justify-between pt-5">
      <PageLink v-if="prev" :value="prev" type="previous" />
      <PageLink v-if="next" :value="next" type="next" />
    </div>
  </div>
</template>
