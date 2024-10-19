<script setup lang="ts">
import type { ContentRendererMarkdown } from "#build/components";

type RendererProps = InstanceType<typeof ContentRendererMarkdown>["$props"];

interface Props {
  class?: ClassValue;
  components?: RendererProps["components"];
  content: RendererProps["value"] | undefined;
}

const props = defineProps<Props>();
</script>

<template>
  <UiProse :class="props.class" as-child>
    <ContentRendererMarkdown
      v-if="content"
      :value="content"
      :components="components"
    />
  </UiProse>
</template>
