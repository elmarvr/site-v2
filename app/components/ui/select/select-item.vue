<script setup lang="ts">
import { type SelectItemProps, useForwardProps } from "reka-ui";

interface Props extends SelectItemProps {
  class?: ClassValue;
}

const props = defineProps<Props>();

const itemProps = reactiveOmit(props, ["class"]);
const forwardedProps = useForwardProps(itemProps);
</script>

<template>
  <RekaSelectItem
    v-bind="forwardedProps"
    :class="
      cx(
        'flex items-center text-sm pl-2 pr-10 py-1 relative transition-colors rounded outline-none focus:bg-accent',
        props.class
      )
    "
  >
    <RekaSelectItemText>
      <slot />
    </RekaSelectItemText>

    <RekaSelectItemIndicator class="absolute right-2">
      <Icon class="size-4 text-primary" name="ph:check" />
    </RekaSelectItemIndicator>
  </RekaSelectItem>
</template>
