<script setup lang="ts">
const { locale } = useI18n();

const props = defineProps<{
  of: string;
  type: Intl.DisplayNamesOptions["type"];
  fallback?: Intl.DisplayNamesOptions["fallback"];
  style?: Intl.DisplayNamesOptions["style"];
}>();

const formatted = computed(() => {
  const { of, ...opts } = props;
  const displayNames = new Intl.DisplayNames(locale.value, opts);

  return displayNames.of(props.of);
});
</script>

<template>
  {{ formatted }}
</template>
