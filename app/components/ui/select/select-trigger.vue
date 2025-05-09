<script setup lang="ts">
import { type SelectTriggerProps, useForwardProps } from "reka-ui";

interface Props extends SelectTriggerProps {
  class?: ClassValue;
}

const props = defineProps<Props>();

const triggerProps = reactiveOmit(props, "class");
const forwardedProps = useForwardProps(triggerProps);
</script>

<template>
  <RekaSelectTrigger v-bind="forwardedProps" :class="cx(props.class)">
    <slot />
  </RekaSelectTrigger>
</template>
