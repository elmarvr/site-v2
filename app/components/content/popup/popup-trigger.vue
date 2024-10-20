<script setup lang="ts">
import { PopupContext } from "./popup.vue";

interface Props {
  class?: ClassValue;
}

const props = defineProps<Props>();

const ctx = inject(PopupContext)!;
</script>

<template>
  <UiPopoverTrigger as-child :class="props.class">
    <span
      :type="undefined"
      role="button"
      @pointerenter="($event) => ctx.onOpenChange($event, true)"
      @pointerleave="($event) => ctx.onOpenChange($event, false)"
    >
      <slot />
    </span>
  </UiPopoverTrigger>
</template>
