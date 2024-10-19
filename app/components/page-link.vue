<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";

defineProps<{
  value: Pick<ParsedContent, "_path" | "title">;
  type: "previous" | "next";
}>();
</script>

<template>
  <NuxtLinkLocale
    :to="value._path"
    :class="
      cx('flex flex-col items-start group', {
        'ml-auto items-end': type === 'next',
      })
    "
  >
    <div
      :class="
        cx('flex items-center text-sm text-muted-foreground', {
          'flex-row-reverse': type === 'next',
        })
      "
    >
      <Icon
        :name="type === 'next' ? 'ph:caret-right' : 'ph:caret-left'"
        class="size-[1em]"
      />

      {{ $t(`general.${type}`) }}
    </div>

    <span class="group-hover:underline">{{ value.title }}</span>
  </NuxtLinkLocale>
</template>
