<script setup lang="ts">
import type { MarkdownParsedContent } from "@nuxt/content";

definePageMeta({
  pageTransition: false,
});

const route = useRoute();
const { locale, defaultLocale } = useI18n();
const localePath = useLocalePath();

const path = computed(() => localePath(route.path, defaultLocale));

const snippet = await queryContent<MarkdownParsedContent>(path.value)
  .locale(locale.value)
  .findOne();

const [prev, next] = await queryContent("snippets")
  .only(["_path", "title"])
  .sort({ date: -1 })
  .findSurround(path.value);

useSeoMeta({
  title: snippet.title,
  description: snippet.description,
});
</script>

<template>
  <div>
    <div class="pb-3">
      <h2 class="inline-flex text-lg">
        {{ snippet.title }}
      </h2>
      <p class="text-muted-foreground">
        {{ $d(snippet.date, { dateStyle: "medium" }) }}
      </p>
    </div>

    <MarkdownContent :content="snippet" />

    <div class="flex justify-between pt-5">
      <PageLink v-if="prev" :value="prev" type="previous" />
      <PageLink v-if="next" :value="next" type="next" />
    </div>
  </div>
</template>
