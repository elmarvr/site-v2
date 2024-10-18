<script setup lang="ts">
import { type SelectItemProps, useForwardProps } from "radix-vue";
import { computed } from "vue";

interface Props extends SelectItemProps {
  class?: ClassValue;
}

const props = defineProps<Props>();

const itemProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(itemProps);
</script>

<template>
  <RadixSelectItem
    v-bind="forwardedProps"
    :class="
      cx(
        'flex items-center text-sm pl-2 pr-10 py-1 relative transition-colors rounded outline-none focus:bg-accent',
        props.class
      )
    "
  >
    <RadixSelectItemText>
      <slot />
    </RadixSelectItemText>

    <RadixSelectItemIndicator class="absolute right-2">
      <Icon class="size-4 text-primary" name="ph:check" />
    </RadixSelectItemIndicator>
  </RadixSelectItem>
</template>
