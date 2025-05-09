<script setup lang="ts">
import type { NuxtLinkProps } from "#app";
import { useForwardProps } from "reka-ui";
import { buttonVariants, type ButtonVariants } from "./button.vue";

interface Props extends NuxtLinkProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: ClassValue;
}

const props = defineProps<Props>();
const delegated = reactiveOmit(props, ["variant", "size", "class"]);
const forwarded = useForwardProps(delegated);
</script>

<template>
  <NuxtLinkLocale
    v-bind="forwarded"
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
