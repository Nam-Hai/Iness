const useStore = createStore(() => {

  const isMobile = ref(false);

  const pageLoaded = ref(false);

  const preventScroll = ref(false);

  const fromPreloader = ref(true)

  const preloaderComplete = ref(false);
  const flowIsHijacked = ref(false)
  const firstRedirect = ref(false)

  return { isMobile, pageLoaded, preventScroll, fromPreloader, preloaderComplete, flowIsHijacked, firstRedirect }
})
export default useStore

export type CursorState = "hover" | "hold" | "default"

const useCursorStore = createStore(() => {
  const cursorState: Ref<CursorState> = ref("default")


  function toggleHover(b: boolean) {
    cursorState.value = b ? "hover" : "default"
  }
  return { cursorState, toggleHover}
})

export { useCursorStore }