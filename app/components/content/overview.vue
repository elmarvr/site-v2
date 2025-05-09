<script setup lang="ts">
const { locale } = useI18n();

const { data: projects } = await useAsyncData(
  `recent-projects_${locale.value}`,
  async () => {
    return await queryCollection(`projects_${locale.value}`).limit(3).all();
  }
);

const { data: snippets } = await useAsyncData(
  `recent-snippets_${locale.value}`,
  async () => {
    return await queryCollection(`snippets_${locale.value}`)
      .order("date", "DESC")
      .limit(3)
      .all();
  }
);
</script>

<template>
  <div class="grid grid-cols-2 not-prose py-12">
    <div>
      <h2 class="pb-4 text-muted-foreground">
        {{ $t("projects.recent") }}
      </h2>
      <ul class="space-y-3">
        <li v-for="project in projects" :key="project.id">
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
        <li v-for="snippet in snippets" :key="snippet.id">
          <NuxtLinkLocale :to="snippet.path" class="hover:underline">
            {{ snippet.title }}
          </NuxtLinkLocale>
        </li>
      </ul>
    </div>
  </div>
</template>
