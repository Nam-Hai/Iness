<template>
  <main ref="wrapperRef">
    index
  </main>
</template>

<script lang="ts" setup>
import { usePageFlow } from '~/waterflow/composables/usePageFlow';
import { defaultFlowIn, defaultFlowOut } from '~/pages_transitions/default.transition';

useResetLenis({
})

const wrapperRef = ref() as Ref<HTMLElement>

usePageFlow({
  props: {
    wrapperRef,
  },
  flowOut: defaultFlowOut,
  flowInCrossfade: defaultFlowIn,
  enableCrossfade: 'TOP'
})

// const tl = useTL()
// onMounted(() => {
//   tl.from({
//     el: wrapperRef.value,
//     d: 1000,
//     e: 'io4',
//     p: {
//       y: [0, 100]
//     }
//   })
//   .play()
// })
</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

main {
  height: var(--100vh);
  width: 100vw;
  top: 0;
  // background-color: black;

  line-height: 100%;
  font-size: 10rem;
}
</style>
