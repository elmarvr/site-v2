<script setup lang="ts">
const props = defineProps<{
  class?: ClassValue;
  code?: string;
  meta?: string;
  filename?: string;
  language?: string;
}>();

const visibleCode = computed(
  () => props.code?.split("// ---cut---").pop() ?? props.code
);
</script>

<template>
  <UiScrollArea class="not-prose relative flex group max-h-[560px]">
    <CopyButton
      v-if="visibleCode"
      :source="visibleCode"
      class="opacity-0 transition absolute right-4 top-4 group-hover:opacity-100 z-20"
    />
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
