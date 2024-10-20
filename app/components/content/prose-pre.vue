<script setup lang="ts">
const props = defineProps<{
  class?: ClassValue;
  code?: string;
  meta?: string;
  filename?: string;
  language?: string;
}>();
</script>

<template>
  <UiScrollArea class="not-prose flex prose-pre max-h-[560px]">
    <pre
      :data-filename="filename"
      :class="
        cx('bg-card rounded text-sm flex p-4 [&_code_.line]:block', props.class)
      "
      :style="{
        '--shiki-default-bg': 'transparent',
      }"
    >
      <slot />
    </pre>
    <UiScrollAreaScrollBar orientation="horizontal" />
  </UiScrollArea>
</template>
