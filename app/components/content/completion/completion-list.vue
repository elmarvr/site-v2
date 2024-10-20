<template>
  <PopupContent
    :side-offset="0"
    class="z-10 flex flex-col list-none min-w-32 py-1 text-foreground"
  >
    <slot />
  </PopupContent>
</template>

<style>
& li {
  @apply flex items-center;
}

html .shiki .twoslash-completions-icon {
  @apply mr-2 size-4 text-muted-foreground block;
}

& .twoslash-completions-matched {
  @apply !text-foreground;
}
& .twoslash-completions-unmatched {
  @apply !text-muted-foreground;
}
</style>
