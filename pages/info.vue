<template>
  <main ref="wrapperRef">
    <div class="info-text__wrapper">

      <div class="info-text" v-for="text in data">
        {{ text }}
      </div>
    </div>

    <div class="contact__grid-item__wrapper">
      <div class="contact__wrapper">
        <span>
          You can contact me on
        </span>
        <span>
          Contact@in.e.studio
        </span>
        <span>
          + 33 7 88 25 6707
        </span>
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

  .contact__grid-item__wrapper {
    grid-column: 1 / 2;
    position: fixed;
    font-size: 5.2rem;

    @include gridRow();

    .contact__wrapper {
      grid-row: 3/4;
      margin-top: -0.5rem;
      line-height: 100%;

      display: flex;
      flex-direction: column;

      span {
        width: max-content;
      }
    }
  }

  line-height: 100%;
}
</style>
