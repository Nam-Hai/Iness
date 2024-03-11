<template>
  <main ref="wrapperRef">
    <div class="info-text__wrapper">

      <div class="info-text" v-for="text in copy">
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

  position: relative;
  margin-top: $main-margin;

  font-weight: 500;

  .info-text__wrapper {
    grid-column: 7 / 8;

    @include breakpoint(mobile) {
      grid-column: 7 / 10;
    }

    >div {
      height: calc((100vh - #{$main-margin * 2})* 0.25);
    }
  }

  .contact__grid-item__wrapper {
    grid-column: 1 / 2;
    position: fixed;
    top: 0;
    font-size: 5.2rem;

    @include breakpoint(mobile) {
      font-size: 2.8rem;
    }

    @include gridRow();

    .contact__wrapper {
      grid-row: 3/4;
      margin-top: -1rem;
      line-height: 120%;

      @include breakpoint(mobile) {
        margin-top: -0.4rem;
        width: 27.4rem;
      }

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
