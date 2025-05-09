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
  <ul class="flex flex-col gap-12">
    <ProjectItem
      v-for="project in projects"
      :key="project.id"
      :project="project"
    />
  </ul>
</template>
