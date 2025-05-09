<script setup lang="ts">
import { type ScrollAreaRootProps } from "reka-ui";

interface Props extends ScrollAreaRootProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const rootProps = reactiveOmit(props, ["class"]);
</script>

<template>
  <RekaScrollAreaRoot
    v-bind="rootProps"
    :class="cx('relative overflow-hidden', props.class)"
  >
    <RekaScrollAreaViewport
      class="h-full w-full max-h-[inherit] rounded-[inherit]"
    >
      <slot />
    </RekaScrollAreaViewport>
    <UiScrollAreaScrollBar />
    <RekaScrollAreaCorner />
  </RekaScrollAreaRoot>
</template>
