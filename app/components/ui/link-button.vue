<script setup lang="ts">
import type { NuxtLinkProps } from "#app";
import { buttonVariants, type ButtonVariants } from "./button.vue";

interface Props extends NuxtLinkProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: ClassValue;
}

const props = defineProps<Props>();
const linkProps = reactiveOmit(props, ["variant", "size", "class"]);
</script>

<template>
  <NuxtLinkLocale
    v-bind="linkProps"
    :class="
      buttonVariants({
        variant,
        size,
        class: props.class,
      })
    "
  >
    <slot />
  </NuxtLinkLocale>
</template>
