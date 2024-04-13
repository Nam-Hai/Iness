import { onFlow } from "~/waterflow/composables/onFlow"

export const useLenisScroll = (callback: (scroll: number) => void) => {

  const { scroll, onScroll } = useStoreScroll()

  let scrollUnSub: () => void | undefined;
  onFlow(() => {
    scrollUnSub = onScroll(callback)
  })

  onBeforeUnmount(() => {
    scrollUnSub && scrollUnSub()
  })

  const off = () => scrollUnSub && scrollUnSub()
  const run = () => {
    scrollUnSub && scrollUnSub()
    scrollUnSub = onScroll(callback)
  }

  const emit = () => callback(scroll.value)

  return {
    off,
    emit,
    run
  }
}
