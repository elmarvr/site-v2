<script setup lang="ts">
const indicatorVariants = cva({
  base: "size-2 relative rounded-full",
  variants: {
    active: {
      true: "bg-primary",
      false: "bg-muted-foreground",
    },
  },
});

const props = withDefaults(
  defineProps<{
    active?: boolean;
    class?: ClassValue;
  }>(),
  { active: false }
);
</script>

<template>
  <div :class="indicatorVariants({ class: props.class, active })">
    <div
      v-if="active"
      class="absolute animate-ping h-full aspect-square rounded-full bg-inherit"
    />
    <div class="h-full aspect-square rounded-full bg-inherit" />
  </div>
</template>
