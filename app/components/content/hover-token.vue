<template>
  <PopupTrigger class="hover-token">
    <slot />
  </PopupTrigger>
</template>

Overwrite global styles with specificity
<style>
.prose-pre span.hover-token {
  @apply underline transition decoration-dotted underline-offset-4 decoration-card;
}
.prose-pre:hover span.hover-token {
  @apply decoration-[--shiki-default];
}
</style>
