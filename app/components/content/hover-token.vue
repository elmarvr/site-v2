<template>
  <PopupTrigger class="hover-token">
    <slot />
  </PopupTrigger>
</template>

<style>
.group span.hover-token {
  text-decoration-style: dotted;
  text-decoration-color: var(--color-card);
  text-decoration-thickness: 2px;
  text-underline-offset: 2px;

  transition-duration: var(--default-transition-duration);
  transition-property: text-decoration-color, text-decoration-thickness;
}
.group:hover span.hover-token {
  text-decoration-color: var(--shiki-default);
}
</style>
