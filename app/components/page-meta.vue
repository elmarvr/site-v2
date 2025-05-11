<script setup lang="ts">
const props = defineProps<{
  page: {
    title: string;
    description: string;
  };
}>();

const { locale } = useI18n();

useHead({
  title: props.page.title,
  titleTemplate: `%s | elmarvr`,
  htmlAttrs: {
    lang: locale.value,
  },
  meta: [
    {
      name: "description",
      content: props.page.description,
    },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "charset", content: "utf-8" },
    { name: "robots", content: "index, follow" },
    { name: "color-scheme", content: "dark" },
  ],
});
</script>

<template>
  <slot />
</template>
