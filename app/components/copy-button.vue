<script setup lang="ts">
const props = defineProps<{ source: string }>();

const source = toRef(props, "source");

const { copy, copied } = useClipboard({ source });
</script>

<template>
  <button>
    <Icon name="ph:copy" />
  </button>
</template>
