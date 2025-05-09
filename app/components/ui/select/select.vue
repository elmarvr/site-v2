<script setup lang="ts">
import {
  useForwardPropsEmits,
  type SelectRootEmits,
  type SelectRootProps,
} from "reka-ui";

const props = defineProps<SelectRootProps>();
const emit = defineEmits<SelectRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <RekaSelectRoot v-bind="forwarded">
    <slot />
  </RekaSelectRoot>
</template>
