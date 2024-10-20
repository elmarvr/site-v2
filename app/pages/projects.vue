<script setup lang="ts">
import type { MarkdownParsedContent } from "@nuxt/content";

const { locale } = useI18n();

interface Project extends MarkdownParsedContent {
  title: string;
  url: string;
  github: string;
  skills: string[];
}

const { data: projects } = await useAsyncData(async () => {
  const list = await queryContent<Project>("projects")
    .locale(locale.value)
    .find();

  return list.map(({ url, github, ...project }) => {
    const links = [
      {
        url: url,
        title: "Live",
      },
      {
        url: github,
        title: "Source",
      },
    ].filter(({ url }) => url);

    return {
      ...project,
      links,
    };
  });
});
</script>

<template>
  <ul class="space-y-12 pt-8">
    <li
      v-for="(project, index) in projects"
      :key="project._id"
      class="flex flex-col items-start gap-3 animate-in fade-in fill-mode-both slide-in-from-bottom-10"
      :style="{ animationDelay: `${100 * index}ms` }"
    >
      <div class="flex items-center">
        <h2 class="font-semibold">{{ project.title }}</h2>

        <div
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
        </div>
      </div>

      <MarkdownContent :content="project" />

      <ul class="flex flex-wrap gap-2">
        <li
          v-for="skill in project.skills"
          class="bg-card py-0.5 px-2 text-xs rounded"
          :key="skill"
        >
          {{ skill }}
        </li>
      </ul>
    </li>
  </ul>
</template>
