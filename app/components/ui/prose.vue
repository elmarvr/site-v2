<script setup lang="ts">
import { type PrimitiveProps } from "reka-ui";

interface Props extends PrimitiveProps {
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), { as: "div" });
</script>

<template>
  <RekaPrimitive
    :as="as"
    :as-child="asChild"
    :class="cx('prose prose-zinc prose-invert', props.class)"
  >
    <slot />
  </RekaPrimitive>
</template>
