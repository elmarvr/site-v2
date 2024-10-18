<script setup lang="ts">
import {
  useForwardPropsEmits,
  type SelectRootEmits,
  type SelectRootProps,
} from "radix-vue";

const props = defineProps<SelectRootProps>();
const emit = defineEmits<SelectRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <RadixSelectRoot v-bind="forwarded">
    <slot />
  </RadixSelectRoot>
</template>
