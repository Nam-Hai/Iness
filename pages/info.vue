<template>
  <main ref="wrapperRef" v-leave>

    <div class="contact__grid-item__wrapper">
      <div class="contact__wrapper">
        <span v-streamed-text>
          You can contact me on
        </span>
        <ILink copy="copy the email" text="Contact@in.e.studio" />
        <ILink copy="copy the phone number" text="+ 33 7 88 25 67 07" />
      </div>
    </div>

    <div class="info-text__wrapper">
      <RichText :props="prismicData.info.richText[0]"></RichText>
      <div class="info-text" v-for="text in [...copy, ...copy]" v-streamed-text="true">
        {{ text }}
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { usePageFlow } from '~/waterflow/composables/usePageFlow';
import { defaultFlowIn, defaultFlowOut } from '~/pages_transitions/default.transition';
import { vStreamedText } from '~/directives/streamedText';
import { vLeave } from '~/directives/leave';

const { copy } = useStoreInfo()
const wrapperRef = ref() as Ref<HTMLElement>
const { prismicData } = usePreloader()

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
    grid-column: 6 / 7;

    @include breakpoint(mobile) {
      grid-column: 6 / 10;
    }

    >div {
      width: 100%;
      height: $grid-cell-height;
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

      .contact__mail {
        &.copied::after {
          color: $primary;
        }

        &::after {
          content: "copy the mail";
          pointer-events: none;
          color: $neutral-text;
          opacity: 0;
          position: absolute;
          left: 0;
        }

        transition: color 250ms;
        cursor: pointer;

        &:hover {
          color: $discard-text;

          &::after {
            opacity: 1;
          }
        }

      }

      span {
        width: max-content;
      }
    }
  }

  line-height: 100%;
}

.info-text {
  font-size: 1.2rem;
  line-height: 1.5rem;
}
</style>
