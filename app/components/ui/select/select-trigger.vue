<script setup lang="ts">
import { type SelectTriggerProps, useForwardProps } from "radix-vue";

interface Props extends SelectTriggerProps {
  class?: ClassValue;
}

const props = defineProps<Props>();

const triggerProps = reactiveOmit(props, "class");
const forwardedProps = useForwardProps(triggerProps);
</script>

<template>
  <RadixSelectTrigger v-bind="forwardedProps" :class="cx(props.class)">
    <slot />
  </RadixSelectTrigger>
</template>
