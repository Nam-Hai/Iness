export function useRO(callback: (e: { vh: number, vw: number, scale: number, breakpoint: string }) => void, triggerCb?: () => void) {
  const { $ROR } = useNuxtApp()
  const ro = new $ROR(callback, triggerCb)

  onMounted(async () => {
    await nextTick()
    ro.on()
  });

  onBeforeUnmount(() => {
    ro.off()
  });

  return ro;
}