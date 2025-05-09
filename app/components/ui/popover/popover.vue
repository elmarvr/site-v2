<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps } from "reka-ui";
import { useForwardPropsEmits } from "reka-ui";

const props = defineProps<PopoverRootProps>();
const emit = defineEmits<PopoverRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <RekaPopoverRoot v-bind="forwarded">
    <slot />
  </RekaPopoverRoot>
</template>
