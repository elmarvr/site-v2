<script setup lang="ts">
definePageMeta({
  title: "page.index.title",
  description: "page.index.description",
});

const { locale } = useI18n();
const { data: introduction } = await useAsyncData(async () => {
  return queryContent("introduction").locale(locale.value).findOne();
});

const { data: recentProjects } = await useAsyncData(async () => {
  return queryContent("projects")
    .locale(locale.value)
    .only(["title", "_path", "url"])
    .limit(3)
    .find();
});

const { data: recentSnippets } = await useAsyncData(async () => {
  return queryContent("snippets")
    .locale(locale.value)
    .only(["title", "_path"])
    .sort({
      date: -1,
    })
    .limit(3)
    .find();
});

const { data: connect } = await useAsyncData(async () => {
  return queryContent("connect").locale(locale.value).findOne();
});
</script>

<template>
  <div class="pt-8">
    <div class="space-y-12">
      <MarkdownContent :content="introduction" />

      <div class="grid grid-cols-2">
        <div>
          <h2 class="pb-5 text-muted-foreground">
            {{ $t("projects.recent") }}
          </h2>
          <ul class="space-y-3">
            <li v-for="project in recentProjects" :key="project._path">
              <a
                v-if="project.url"
                :href="project.url"
                class="flex items-center gap-2 hover:underline"
              >
                {{ project.title }}
                <Icon
                  name="ph:arrow-right"
                  class="transform size-3.5 text-primary mt-0.5 -rotate-45"
                />
              </a>
              <NuxtLinkLocale v-else to="/projects" class="hover:underline">
                {{ project.title }}
              </NuxtLinkLocale>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="pb-5 text-muted-foreground">
            {{ $t("snippets.recent") }}
          </h2>
          <ul class="space-y-3">
            <li v-for="snippet in recentSnippets" :key="snippet._path">
              <NuxtLinkLocale :to="snippet._path" class="hover:underline">
                {{ snippet.title }}
              </NuxtLinkLocale>
            </li>
          </ul>
        </div>
      </div>

      <Spotify />

      <div>
        <h2 class="pb-5 text-muted-foreground">Connect</h2>
        <MarkdownContent :content="connect" />
      </div>
    </div>
  </div>
</template>
