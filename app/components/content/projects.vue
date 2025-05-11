<script setup lang="ts">
const { locale } = useI18n();

const collection = computed(() => {
  return `projects_${locale.value}` as const;
});

const { data: projects } = await useAsyncData(collection.value, () => {
  return queryCollection(collection.value).all();
});
</script>

<template>
  <ul class="flex flex-col gap-12 not-prose">
    <ProjectItem
      v-for="(project, index) in projects"
      :key="project.id"
      :index="index"
      :project="project"
    />
  </ul>
</template>
