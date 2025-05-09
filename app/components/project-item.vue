<script setup lang="ts">
import type { ProjectsEnCollectionItem } from "@nuxt/content";

defineProps<{
  project: ProjectsEnCollectionItem;
}>();
</script>

<template>
  <li :key="project.id" class="flex flex-col items-start gap-3">
    <div class="flex items-center">
      <h2 class="font-semibold">{{ project.title }}</h2>

      <!-- <div
          v-if="project.links.length > 0"
          class="h-[1em] w-px bg-border mx-5"
        />

        <div class="flex gap-3">
          <a
            class="flex items-center gap-1 group hover:underline"
            :href="link.url"
            v-for="link in project.links"
          >
            {{ link.title }}

            <Icon
              name="ph:arrow-right"
              class="transform size-3.5 text-primary mt-0.5 -rotate-45"
            />
          </a>
        </div> -->
    </div>

    <ContentRenderer :value="project" class="prose prose-zinc prose-invert" />

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
