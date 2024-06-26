import { onFlow, onSwap } from "~/waterflow/composables/onFlow";

type useScrollEventOptions = {
  el: Ref<HTMLElement>;
  vStart?: number;
  eStart?: number;
  vEnd?: number;
  eEnd?: number;
  onEnter?: () => void;
  onProgress?: (t: number) => void;
  pin?: boolean;
};

export const useScrollEvent = ({
  el,
  vStart = 100,
  eStart = 0,
  vEnd = 0,
  eEnd = 100,
  onEnter = undefined,
  onProgress = undefined,
}: useScrollEventOptions) => {
  const hasEnter = ref(false);
  // const bounds = ref() as Ref<DOMRect>;


  // const resize = () => {
  //   bounds.value = el.value.getBoundingClientRect();
  //   bounds.value.y = bounds.value.top + window.scrollY;
  // };

  // const { vh, vw } = useStoreView();
  // useRO(resize);

  // onMounted(() => {
  //   bounds.value = el.value.getBoundingClientRect();
  //   bounds.value.y = bounds.value.top;
  // });

  // const flow = onFlow(() => {
  //   intersectionInit();
  //   lenis.emit()
  // })

  // const { lenis } = useLenisScroll(() => {
  //   if (!bounds.value) return
  //   const dist = window.scrollY - bounds.value.y + (vh.value * vStart) / 100 - (bounds.value.height * eStart) / 100;
  //   const max = (bounds.value.height * (eEnd - eStart)) / 100 + (vh.value * (vStart - vEnd)) / 100;
  //   const offset = N.Clamp(dist, 0, max);
  //   const t = offset / max;
  //   if (t > 0 && !hasEnter.value && flow.value) {
  //     hasEnter.value = true;
  //     onEnter && onEnter();

  //     if (!onProgress) {
  //       intersectionObserver.value?.disconnect();
  //       lenis.stop();
  //     }
  //   }
  //   flow.value && onProgress && onProgress(t);
  // });

  // const intersectionObserver = ref() as Ref<IntersectionObserver>;
  // const intersectionInit = () => {
  //   intersectionObserver.value = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       entry.isIntersecting ? lenis.run() : lenis.stop();
  //     });
  //   });
  //   intersectionObserver.value.observe(el.value);
  // };

  // onBeforeUnmount(() => {
  //   intersectionObserver.value.disconnect();
  // });
};

export const onEnter = ({
  el,
  vStart = 100,
  eStart = 0,
  vEnd = 0,
  eEnd = 100,
  enterCb,
  leaveCb,
  once = false,
  both = false
}: {
  el: Ref<HTMLElement>;
  vStart?: number;
  eStart?: number;
  vEnd?: number;
  eEnd?: number;
  leave?: number;
  once?: boolean;
  enterCb?: () => void;
  leaveCb?: () => void;
  both?: boolean
}) => {
  const hasEnter = ref(false);
  let bounds: DOMRect;
  let boundY = 0

  const computeBounds = () => {
    if (!el.value) return
    bounds = el.value.getBoundingClientRect();
    boundY = bounds.top + scrollY
  };

  const { vh, vw, breakpoint } = useStoreView();
  useRO(computeBounds);

  onFlow(async () => {
    await nextTick()
    computeBounds()

    flow.value = true
    // lenis.run();
    // lenis.emit()
  });

  const flow = ref(false)

  const lenis = useLenisScroll(scroll => {
    if (!bounds) return
    if (breakpoint.value !== 'mobile') return
    const dist = scroll - boundY + (vh.value * vStart) / 100 - (bounds.height * eStart) / 100;
    const max = (bounds.height * (eEnd - eStart)) / 100 + (vh.value * (vStart - vEnd)) / 100;
    const offset = N.Clamp(dist, 0, max);
    const t = offset / max;
    if (both && t == 1) {
      hasEnter.value && (hasEnter.value = false)
    } else if (t > 0 && (!hasEnter.value && flow.value)) {
      hasEnter.value = true;
      enterCb && enterCb();
      // intersectionObserver.value.disconnect();
      // lenis.off()
    } else if (t <= 0 && hasEnter.value && !once) {
      leaveCb && leaveCb()
      hasEnter.value = false
    }
  })

  // onBeforeUnmount(() => {
  //   lenis.off()
  // })



  return hasEnter
};
