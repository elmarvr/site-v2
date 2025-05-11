<script setup lang="ts">
defineProps<{
  to: string;
  type: "previous" | "next";
}>();
</script>

<template>
  <NuxtLink
    :to="to"
    :class="
      cx('flex flex-col items-start group', {
        'ml-auto items-end': type === 'next',
      })
    "
  >
    <div
      :class="
        cx('flex items-center text-sm text-muted-foreground gap-2', {
          'flex-row-reverse': type === 'next',
        })
      "
    >
      <Icon :name="type === 'next' ? 'ph:caret-right' : 'ph:caret-left'" />

      {{ $t(`general.${type}`) }}
    </div>

    <span class="group-hover:underline">
      <slot />
    </span>
  </NuxtLink>
</template>
