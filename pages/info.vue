<template>
  <main ref="wrapperRef">
    <div class="info-text__wrapper">

      <div class="info-text" v-for="text in data">
        {{ text }}
      </div>
    </div>

  </main>
</template>

<script lang="ts" setup>
import { usePageFlow } from '~/waterflow/composables/usePageFlow';
import { defaultFlowIn, defaultFlowOut } from '~/pages_transitions/default.transition';

const { copy } = useStoreInfo()
const { data, pending, error, refresh } = useAsyncData(
  'info',
  () => {
    return new Promise<string[]>(res => {
      useDelay(500, () => {
        res([...copy, ...copy])
      })
    })

    // return $fetch('https://api.nuxtjs.dev/mountains')
  }
)

const wrapperRef = ref() as Ref<HTMLElement>

usePageFlow({
  props: {
    wrapperRef,
  },
  flowOut: defaultFlowOut,
  flowInCrossfade: defaultFlowIn,
  enableCrossfade: 'TOP'
})
</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

main {
  @include gridColumn();

  padding-top: $main-margin;

  font-weight: 500;

  .info-text__wrapper {
    grid-column: 7 / 8;

    >div {
      height: calc((100vh - #{$main-margin * 2})* 0.25);
    }
  }

  line-height: 100%;
}
</style>
