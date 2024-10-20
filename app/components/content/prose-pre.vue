<script setup lang="ts">
const props = defineProps<{
  class?: ClassValue;
  code: string;
  meta: string;
  filename: string;
  language: string;
}>();
</script>

<template>
  <UiScrollArea class="not-prose flex max-h-[560px] prose-pre">
    <pre
      :class="
        cx(
          'bg-card rounded !text-sm flex p-2 [&_.line]:block [&_span]:!bg-transparent',
          props.class
        )
      "
    >
      <slot />
    </pre>
    <UiScrollAreaScrollBar orientation="horizontal" />
  </UiScrollArea>
</template>
