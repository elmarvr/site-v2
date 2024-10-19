<script setup lang="ts">
import {
  useForwardPropsEmits,
  type SelectContentEmits,
  type SelectContentProps,
} from "radix-vue";

const popoverVariants = compose(
  focusRing,
  cva({
    base: "bg-popover rounded border text-popover-foreground p-4 z-20 ui-state-open:animate-in ui-state-open:fade-in ui-state-open:zoom-in-95 ui-state-closed:animate-out ui-state-closed:fade-out ui-state-closed:zoom-out-95 ui-side-bottom:slide-in-from-top-2 ui-side-top:slide-in-from-bottom-2",
  })
);

defineOptions({
  inheritAttrs: false,
});

interface Props extends SelectContentProps {
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), {
  position: "popper",
  sideOffset: 2,
});
const emit = defineEmits<SelectContentEmits>();

const contentProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(contentProps, emit);
</script>

<template>
  <RadixSelectPortal>
    <RadixSelectContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        popoverVariants({
          class: cx('p-1', props.class),
        })
      "
    >
      <RadixSelectViewport>
        <slot />
      </RadixSelectViewport>
    </RadixSelectContent>
  </RadixSelectPortal>
</template>
