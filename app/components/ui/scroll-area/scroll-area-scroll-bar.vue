<script setup lang="ts">
import type { ScrollAreaScrollbarProps } from "reka-ui";

const scrollbarVariants = cva({
  base: "flex touch-none select-none transition-colors",
  variants: {
    orientation: {
      vertical: "h-full w-4 border-l border-l-transparent p-1",
      horizontal: "h-4 flex-col border-t border-t-transparent p-1",
    },
  },
});

interface Props extends ScrollAreaScrollbarProps {
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), {
  orientation: "vertical",
});
const scrollbarProps = reactiveOmit(props, ["class"]);
</script>

<template>
  <RekaScrollAreaScrollbar
    v-bind="scrollbarProps"
    :class="scrollbarVariants({ orientation, class: props.class })"
  >
    <RekaScrollAreaThumb class="relative flex-1 rounded-full bg-border" />
  </RekaScrollAreaScrollbar>
</template>
