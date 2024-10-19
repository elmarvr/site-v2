<script setup lang="ts">
import type { VNode } from "vue";

const slots = useSlots();

const tabs = computed(() => slots.default?.().filter(isPreChild) ?? []);

function isPreChild(
  child: VNode
): child is VNode & { props: { filename: string } } {
  return !!child.props?.filename;
}
</script>

<template>
  <UiTabs
    :default-value="tabs[0]?.props.filename"
    class="bg-card rounded border"
  >
    <UiTabsList>
      <UiTabsTrigger
        :value="tab.props.filename"
        v-for="tab in tabs"
        key="tabs-trigger-{{tab.props.filename}}"
      >
        {{ tab.props.filename }}
      </UiTabsTrigger>
    </UiTabsList>
    <UiTabsContent
      class="mt-0"
      :value="tab.props.filename"
      v-for="tab in tabs"
      key="tabs-content-{{tab.props.filename}}"
    >
      <component :is="tab" />
    </UiTabsContent>
  </UiTabs>
</template>
