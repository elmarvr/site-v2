<script lang="ts">
export const PopupContext: InjectionKey<{
  onOpenChange: (e: PointerEvent, value: boolean) => void;
}> = Symbol("PopupContext");
</script>

<script setup lang="ts">
import type { InjectionKey } from "vue";

interface Props {
  delay?: number;
  static?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  delay: 200,
  static: false,
});
const isOpen = ref(false);

let timeout: number | null = null;

function onOpenChange(e: PointerEvent, value: boolean) {
  if (e.pointerType === "touch") return;
  if (timeout) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(() => {
    isOpen.value = value;
  }, props.delay);
}

provide(PopupContext, { onOpenChange });
</script>

<template>
  <UiPopover
    class="z-20"
    :open="isOpen || static"
    @update:open="isOpen = $event"
  >
    <slot />
  </UiPopover>
</template>
