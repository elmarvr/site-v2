<script setup lang="ts">
const { locale } = useI18n();
const { data } = await useAsyncData(async () => {
  return queryContent("introduction").locale(locale.value).findOne();
});

const value = ref("i");
</script>

<template>
  <UiTabs v-model="value">
    <UiTabsList>
      <UiTabsTrigger value="i">Introduction</UiTabsTrigger>
      <UiTabsTrigger value="s">Spotify</UiTabsTrigger>
    </UiTabsList>
    <UiTabsContent value="i"> Introduction </UiTabsContent>
    <UiTabsContent value="s"> Spotify </UiTabsContent>
  </UiTabs>

  <!-- <UiProse>
    <ContentRendererMarkdown v-if="data" :value="data" />
  </UiProse>
  <Spotify /> -->
</template>
