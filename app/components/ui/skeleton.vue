<script setup lang="ts">
interface Props {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <RadixPrimitive :class="cx('bg-muted animate-pulse rounded', props.class)">
    <slot />
  </RadixPrimitive>
</template>
