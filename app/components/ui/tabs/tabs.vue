<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from "reka-ui";
import { useForwardPropsEmits } from "reka-ui";

const props = defineProps<TabsRootProps>();
const emit = defineEmits<TabsRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <RekaTabsRoot v-bind="forwarded">
    <slot />
  </RekaTabsRoot>
</template>
