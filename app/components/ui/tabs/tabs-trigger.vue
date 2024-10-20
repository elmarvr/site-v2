<script setup lang="ts">
import type { TabsTriggerProps } from "radix-vue";

interface Props extends TabsTriggerProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const triggerProps = reactiveOmit(props, ["class"]);
</script>

<template>
  <RadixTabsTrigger
    v-bind="triggerProps"
    :class="
      cx(
        focusRing(),
        'px-1.5 ui-state-active:after:h-0.5 h-9 flex items-center cursor-pointer justify-center transition-colors ui-state-active:text-foreground hover:text-foreground text-muted-foreground',
        props.class
      )
    "
  >
    <slot />
  </RadixTabsTrigger>
</template>
