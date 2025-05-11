<script setup lang="ts">
const props = defineProps<{ source: string; class?: ClassValue }>();

const source = toRef(props, "source");

const { copy, copied } = useClipboard({ source });
</script>

<template>
  <UiButton
    :class="cx('bg-card border size-8', props.class)"
    type="button"
    @click="copy()"
    :disabled="copied"
    :aria-label="$t('general.copy')"
  >
    <Icon v-if="!copied" name="ph:copy" />
    <Icon v-else name="ph:check" />
  </UiButton>
</template>

<style>
.shiki .twoslash-popup-code button span {
  color: red;
}
</style>
