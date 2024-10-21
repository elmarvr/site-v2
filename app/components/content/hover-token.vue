<template>
  <PopupTrigger class="hover-token">
    <slot />
  </PopupTrigger>
</template>

Overwrite global styles with specificity
<style>
.group span.hover-token {
  @apply underline transition decoration-dotted underline-offset-2 decoration-card;
}
.group:hover span.hover-token {
  @apply decoration-[--shiki-default];
}
</style>
