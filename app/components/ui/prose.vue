<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "radix-vue";

interface Props extends PrimitiveProps {
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), { as: "div" });
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cx('prose prose-zinc prose-invert', props.class)"
  >
    <slot />
  </Primitive>
</template>
