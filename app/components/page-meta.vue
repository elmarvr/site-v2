<script setup lang="ts">
const props = defineProps<{
  item: {
    title: string;
    description: string;
  };
}>();

useHead({
  title: props.item.title,
  titleTemplate: `%s | elmarvr`,
  meta: [
    {
      name: "description",
      content: props.item.description,
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
