<script setup lang="ts">
import {
  useForwardPropsEmits,
  type SelectContentEmits,
  type SelectContentProps,
} from "radix-vue";
import { popoverVariants } from "../popover/popover-content.vue";

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

const contentProps = reactiveOmit(props, ["class"]);

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
