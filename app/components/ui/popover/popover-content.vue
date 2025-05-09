<script lang="ts">
export const popoverVariants = compose(
  focusRing,
  cva({
    base: "bg-popover rounded border text-popover-foreground p-4 z-20 ui-state-open:animate-in ui-state-open:fade-in ui-state-open:zoom-in-95 ui-state-closed:animate-out ui-state-closed:fade-out ui-state-closed:zoom-out-95 ui-side-bottom:slide-in-from-top-2 ui-side-top:slide-in-from-bottom-2",
  })
);
</script>

<script setup lang="ts">
import {
  type PopoverContentEmits,
  type PopoverContentProps,
  useForwardPropsEmits,
} from "reka-ui";

defineOptions({
  inheritAttrs: false,
});

interface Props extends PopoverContentProps {
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), {
  align: "center",
  sideOffset: 4,
});
const emit = defineEmits<PopoverContentEmits>();

const contentProps = reactiveOmit(props, ["class"]);
const forwarded = useForwardPropsEmits(contentProps, emit);
</script>

<template>
  <RekaPopoverContent
    v-bind="{ ...forwarded, ...$attrs }"
    :class="cx(popoverVariants(), props.class)"
  >
    <slot />
  </RekaPopoverContent>
</template>
