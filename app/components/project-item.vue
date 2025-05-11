<script setup lang="ts">
import type { ProjectsEnCollectionItem } from "@nuxt/content";

const props = defineProps<{
  project: ProjectsEnCollectionItem;
  index: number;
}>();

const links = computed(() => {
  return [
    {
      title: "Live",
      url: props.project.url,
    },
    {
      title: "Source",
      url: props.project.github,
    },
  ].filter((link) => link.url);
});
</script>

<template>
  <li
    :key="project.id"
    class="flex flex-col items-start gap-3 animate-in fade-in fill-mode-both slide-in-from-bottom-10"
    :style="{ animationDelay: `${100 * index}ms` }"
  >
    <div class="flex items-center">
      <h2 class="font-semibold">{{ project.title }}</h2>

      <template v-if="links.length > 0">
        <div class="h-[1em] w-px bg-border mx-5" />
        <div class="flex gap-3">
          <a
            class="flex items-center gap-1 group hover:underline"
            :href="link.url"
            v-for="link in links"
          >
            {{ link.title }}

            <Icon
              name="ph:arrow-right"
              class="transform size-3.5 text-primary mt-0.5 -rotate-45"
            />
          </a>
        </div>
      </template>
    </div>

    <ContentRenderer
      :value="project"
      class="prose prose-zinc prose-invert max-w-none"
    />

    <ul class="flex flex-wrap gap-2">
      <li
        v-for="skill in project.stack"
        class="bg-card py-0.5 px-2 text-xs rounded"
        :key="skill"
      >
        {{ skill }}
      </li>
    </ul>
  </li>
</template>
