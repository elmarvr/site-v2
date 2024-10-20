<script setup lang="ts">
import { type PopoverTriggerProps } from "radix-vue";

interface Props extends PopoverTriggerProps {}

const props = defineProps<Props>();
</script>

<template>
  <RadixPopoverTrigger v-bind="props">
    <slot />
  </RadixPopoverTrigger>
</template>
