<script lang="ts">
export const PopupContext: InjectionKey<{
  onOpenChange: (e: PointerEvent, value: boolean) => void;
}> = Symbol("PopupContext");
</script>

<script setup lang="ts">
import type { InjectionKey } from "vue";

const isOpen = ref(false);
const timeoutRef = ref<NodeJS.Timeout>();

interface Props {
  delay?: number;
}

const props = withDefaults(defineProps<Props>(), {
  delay: 200,
});

function onOpenChange(e: PointerEvent, value: boolean) {
  if (e.pointerType === "touch") return;
  if (timeoutRef.value) {
    clearTimeout(timeoutRef.value);
  }

  timeoutRef.value = setTimeout(() => {
    isOpen.value = value;
  }, props.delay);
}

provide(PopupContext, { onOpenChange });
</script>

<template>
  <UiPopover v-model:open="isOpen">
    <slot />
  </UiPopover>
</template>
