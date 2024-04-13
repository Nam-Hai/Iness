<template>
  <main ref="wrapperRef">
    Shop
  </main>
</template>

<script lang="ts" setup>
import { usePageFlow } from '~/waterflow/composables/usePageFlow';
import { defaultFlowIn, indexFlowOut } from '~/pages_transitions/default.transition';

const wrapperRef = ref() as Ref<HTMLElement>

const { resetFilter } = useStoreFilter()
resetFilter()

usePageFlow({
  props: {
    wrapperRef,
  },
  flowOut: indexFlowOut,
  flowInCrossfade: defaultFlowIn,
  enableCrossfade: 'TOP'
})

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;
</style>
