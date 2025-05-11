<template>
  <PopupContent
    :side-offset="0"
    class="z-10 flex flex-col list-none min-w-32 py-1 text-foreground completion-list"
  >
    <slot />
  </PopupContent>
</template>

<style>
.completion-list li {
  display: flex;
  align-items: center;
}

html .shiki .twoslash-completions-icon {
  margin-right: calc(var(--spacing) * 2);
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
  color: var(--color-muted-foreground);
  display: block;
}

.completion-list .twoslash-completions-matched {
  color: var(--color-foreground) !important;
}
.completion-list .twoslash-completions-unmatched {
  color: var(--color-muted-foreground) !important;
}
</style>
