<script setup lang="ts">
const { locale } = useI18n();
const { data } = await useAsyncData(async () => {
  return queryContent("introduction").locale(locale.value).findOne();
});

const value = ref("i");
</script>

<template>
  <UiPopup>
    <UiPopupTrigger> Open </UiPopupTrigger>
    <UiPopupContent> Test123 </UiPopupContent>
  </UiPopup>

  <!-- <UiProse>
    <ContentRendererMarkdown v-if="data" :value="data" />
  </UiProse>
  <Spotify /> -->
</template>
