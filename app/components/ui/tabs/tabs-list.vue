<script setup lang="ts">
import type { TabsListProps } from "reka-ui";

interface Props extends TabsListProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const listProps = reactiveOmit(props, ["class"]);
</script>

<template>
  <RekaTabsList
    v-bind="listProps"
    :class="cx('border-b-2 relative flex px-3', props.class)"
  >
    <slot />
    <RekaTabsIndicator
      class="absolute z-10 rounded -bottom-0.5 transition-all left-(--reka-tabs-indicator-position) w-(--reka-tabs-indicator-size) h-0.5 bg-primary"
    />
  </RekaTabsList>
</template>
