<script setup lang="ts">
import {
  useForwardPropsEmits,
  type SelectContentEmits,
  type SelectContentProps,
} from "reka-ui";
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
  <RekaSelectPortal>
    <RekaSelectContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        popoverVariants({
          class: cx('p-1', props.class),
        })
      "
    >
      <RekaSelectViewport>
        <slot />
      </RekaSelectViewport>
    </RekaSelectContent>
  </RekaSelectPortal>
</template>
