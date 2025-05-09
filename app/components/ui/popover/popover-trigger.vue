<script setup lang="ts">
import { type PopoverTriggerProps } from "reka-ui";

interface Props extends PopoverTriggerProps {}

const props = defineProps<Props>();
</script>

<template>
  <RekaPopoverTrigger v-bind="props">
    <slot />
  </RekaPopoverTrigger>
</template>
