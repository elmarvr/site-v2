<script setup lang="ts">
import type { TabsListProps } from "radix-vue";

interface Props extends TabsListProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const listProps = reactiveOmit(props, ["class"]);

const mounted = useMounted();
</script>

<template>
  <RadixTabsList
    v-bind="listProps"
    :class="cx('border-b-2 relative flex px-3', props.class)"
  >
    <slot />
    <RadixTabsIndicator
      v-if="mounted"
      class="absolute z-10 rounded -bottom-0.5 transition-all left-[--radix-tabs-indicator-position] w-[--radix-tabs-indicator-size] h-0.5 bg-primary"
    />
  </RadixTabsList>
</template>
