<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from "radix-vue";
import { useForwardPropsEmits } from "radix-vue";

const props = defineProps<TabsRootProps>();
const emit = defineEmits<TabsRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <RadixTabsRoot v-bind="forwarded">
    <slot />
  </RadixTabsRoot>
</template>
