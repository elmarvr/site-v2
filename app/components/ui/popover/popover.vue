<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps } from "radix-vue";
import { useForwardPropsEmits } from "radix-vue";

const props = defineProps<PopoverRootProps>();
const emit = defineEmits<PopoverRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <RadixPopoverRoot v-bind="forwarded">
    <slot />
  </RadixPopoverRoot>
</template>
