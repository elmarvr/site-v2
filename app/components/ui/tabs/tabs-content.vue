<script setup lang="ts">
import { type TabsContentProps } from "radix-vue";

interface Props extends TabsContentProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const contentProps = reactiveOmit(props, ["class"]);
</script>

<template>
  <RadixTabsContent
    v-bind="contentProps"
    :class="cx(focusRing(), 'rounded mt-2', props.class)"
  >
    <slot />
  </RadixTabsContent>
</template>
