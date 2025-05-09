<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();
</script>

<template>
  <UiSelect
    :model-value="locale"
    @update:model-value="(l) => setLocale(l as 'en')"
  >
    <slot />
    <UiSelectContent align="end">
      <UiSelectItem
        v-for="locale in locales"
        :key="locale.code"
        :value="locale.code"
      >
        {{ locale.language }}
      </UiSelectItem>
    </UiSelectContent>
  </UiSelect>
</template>
