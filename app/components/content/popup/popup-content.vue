<script lang="ts" setup>
import { PopupContext } from "./popup.vue";

interface Props {
  class?: ClassValue;
  sideOffset?: number;
}
const props = withDefaults(defineProps<Props>(), {
  sideOffset: 8,
});

const ctx = inject(PopupContext)!;
</script>

<template>
  <UiPopoverContent
    @open-auto-focus.prevent
    as-child
    :class="cx('p-2 text-sm', props.class)"
    align="start"
    :side-offset="props.sideOffset"
  >
    <div
      @pointerenter="($event) => ctx.onOpenChange($event, true)"
      @pointerleave="($event) => ctx.onOpenChange($event, false)"
    >
      <slot />
    </div>
  </UiPopoverContent>
</template>

<style>
.twoslash-popup-code span {
  color: var(--shiki-default);
}

.twoslash-popup-code pre {
  padding: calc(var(--spacing) * 2);
}

.twoslash-popup-code .group {
  max-width: var(--breakpoint-2xl);
}
</style>
