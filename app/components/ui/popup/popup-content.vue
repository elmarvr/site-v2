<script lang="ts" setup>
import { PopupContext } from "./popup.vue";

interface Props {
  class?: ClassValue;
}
const props = defineProps<Props>();

const ctx = inject(PopupContext)!;
</script>

<template>
  <UiPopoverContent
    @open-auto-focus.prevent
    as-child
    :class="cx('p-2 text-sm', props.class)"
    align="start"
    :side-offset="8"
  >
    <div
      @pointerenter="($event) => ctx.onOpenChange($event, true)"
      @pointerleave="($event) => ctx.onOpenChange($event, false)"
    >
      <slot />
    </div>
  </UiPopoverContent>
</template>
