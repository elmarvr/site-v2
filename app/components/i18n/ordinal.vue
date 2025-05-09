<script setup lang="ts">
const { locale, t } = useI18n();

const props = defineProps<{
  value: number;
}>();

const map = new Map([
  ["one", t("ordinal.one")],
  ["two", t("ordinal.two")],
  ["few", t("ordinal.few")],
  ["other", t("ordinal.other")],
]);

const formatted = computed(() => {
  const formatter = new Intl.PluralRules(locale.value, {
    type: "ordinal",
  });

  const rule = formatter.select(props.value);

  return map.get(rule) ?? map.get("other");
});
</script>

<template>{{ value }}{{ formatted }}</template>
