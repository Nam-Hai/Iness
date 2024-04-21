<template>
  <main ref="wrapperRef">

    <div class="contact__grid-item__wrapper">
      <div class="contact__wrapper">
        <span v-streamed-text v-leave-text>
          You can contact me on
        </span>
        <ILink copy="copy email" text="Contact@in.e.studio" :font="false" v-if="!isMobile" />
        <NuxtLink class="link-hover" to="mailto:contact@in.e.studio" v-streamed-text v-leave-text v-else>Contact@in.e.studio
        </NuxtLink>

        <ILink copy="copy phone number" text="+ 33 7 88 25 67 07" :font="false" v-if="!isMobile" />
        <NuxtLink class="link-hover" to="tel:+33788256707" v-streamed-text v-leave-text v-else>+ 33 7 88 25 67 07</NuxtLink>
      </div>
    </div>

    <div class="info-text__wrapper">
      <RichText :props="richText" v-for="richText, index in prismicData.info" :key="'info-text-' + index"></RichText>
      <!-- <div class="info-text" v-for="(text, index) in [...copy, ...copy]" v-streamed-text="index * 5"
        :key="'info-text-' + index">
        {{ text }}
      </div> -->
    </div>
  </main>
</template>

<script lang="ts" setup>
import { usePageFlow } from '~/waterflow/composables/usePageFlow';
import { defaultFlowIn, defaultFlowOut } from '~/pages_transitions/default.transition';
import { vStreamedText } from '~/directives/streamedText';
import { vLeave, vLeaveText } from '~/directives/leave';

const { copy } = useStoreInfo()
const wrapperRef = ref() as Ref<HTMLElement>
const { prismicData } = usePreloader()
const { isMobile } = useStore()

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
  height: 100vh;

  .info-text__wrapper {
    grid-column: 6 / 7;

    @include breakpoint(mobile) {
      grid-column: 6 / 10;
    }

    >div {
      width: 100%;
      height: $grid-cell-height;


      &:last-child {
        height: $grid-cell-height;
        padding-bottom: calc($main-margin + $grid-cell-height + env(safe-area-inset-bottom));
      }
    }
  }

  .contact__grid-item__wrapper {
    grid-column: 1 / 2;
    position: fixed;
    top: 0;
    font-size: 5.2rem;
    pointer-events: none;

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

.link-hover {

  pointer-events: auto;

  &::after {
    position: absolute;
    left: 1rem;
    top: 0.5rem;
    color: $neutral-text;
    content: "call me";
    opacity: 0;
    transition: opacity 250ms;
  }

  transition: color 250ms;

  &:hover {
    color: $discard-text;

    &::after {
      opacity: 1;
    }
  }
}
</style>
