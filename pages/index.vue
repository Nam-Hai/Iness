<template>
  <main ref="wrapperRef">
    <Overview />
  </main>
</template>

<script lang="ts" setup>
import { usePageFlow } from '~/waterflow/composables/usePageFlow';
import { defaultFlowIn, defaultFlowOut, flowOutMap } from '~/pages_transitions/default.transition';

const { isMobile } = useStore()
const wrapperRef = ref() as Ref<HTMLElement>

usePageFlow({
  props: {
    wrapperRef,
  },
  flowOutMap: flowOutMap,
  flowInCrossfade: defaultFlowIn,
  enableCrossfade: 'TOP'
})

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

video {
  height: 20rem;
}
</style>
