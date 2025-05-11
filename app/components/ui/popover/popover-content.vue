<script lang="ts">
export const popoverVariants = compose(
  focusRing,
  cva({
    base: "bg-popover rounded border text-popover-foreground p-4 z-20 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
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
