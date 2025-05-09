<script lang="ts">
export const buttonVariants = compose(
  focusRing,
  cva({
    base: "px-4 h-9 flex items-center justify-center rounded transition-colors",
    variants: {
      variant: {
        subtle: "bg-transparent text-white hover:bg-white/10",
      },
      size: {
        icon: "p-0 w-9",
      },
    },
    defaultVariants: {
      variant: "subtle",
      size: "icon",
    },
  })
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
</script>

<script setup lang="ts">
import type { VariantProps } from "cva";
import type { PrimitiveProps } from "reka-ui";

interface Props extends PrimitiveProps {
  class?: ClassValue;
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
});
</script>

<template>
  <RekaPrimitive
    :as="as"
    :as-child="asChild"
    :class="
      buttonVariants({
        variant,
        size,
        class: props.class,
      })
    "
  >
    <slot />
  </RekaPrimitive>
</template>
