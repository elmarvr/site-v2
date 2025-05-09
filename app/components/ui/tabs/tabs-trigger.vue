<script setup lang="ts">
import type { TabsTriggerProps } from "reka-ui";

interface Props extends TabsTriggerProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const triggerProps = reactiveOmit(props, ["class"]);
</script>

<template>
  <RekaTabsTrigger
    v-bind="triggerProps"
    :class="
      cx(
        focusRing(),
        'px-1.5 h-9 flex items-center cursor-pointer justify-center transition-colors data-[state=active]:text-foreground hover:text-foreground text-muted-foreground',
        props.class
      )
    "
  >
    <slot />
  </RekaTabsTrigger>
</template>
