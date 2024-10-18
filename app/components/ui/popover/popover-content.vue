<script lang="ts">
export const popoverVariants = compose(
  focusRing,
  cva({
    base: "bg-popover rounded border text-popover-foreground p-4 z-20 ui-state-open:animate-in ui-state-open:fade-in ui-state-open:zoom-in-95 ui-state-closed:animate-out ui-state-closed:fade-out ui-state-closed:zoom-out-95 ui-side-bottom:slide-in-from-top-2 ui-side-top:slide-in-from-bottom-2",
  })
);
</script>
