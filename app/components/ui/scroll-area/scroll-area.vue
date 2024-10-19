<script setup lang="ts">
import { type ScrollAreaRootProps } from "radix-vue";

interface Props extends ScrollAreaRootProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const rootProps = reactiveOmit(props, ["class"]);
</script>

<template>
  <RadixScrollAreaRoot
    v-bind="rootProps"
    :class="cx('relative overflow-hidden', props.class)"
  >
    <RadixScrollAreaViewport
      class="h-full w-full max-h-[inherit] rounded-[inherit]"
    >
      <slot />
    </RadixScrollAreaViewport>
    <UiScrollAreaScrollBar />
    <RadixScrollAreaCorner />
  </RadixScrollAreaRoot>
</template>
