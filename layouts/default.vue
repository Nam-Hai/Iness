<template>
  <div class="app__wrapper">
    <Menu />
    <!-- <LenisWrapper /> -->
    <div class="page__wrapper">
      <Preloader>
        <BufferPage />
      </Preloader>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFlowProvider } from "~/waterflow/FlowProvider";
import BufferPage from "~/waterflow/components/BufferPage.vue";

const flowProvider = useFlowProvider();

// useRaf(
//   (e) => {
//     // !flowProvider.flowIsHijacked.value && 
//     lenis.value.raf(e.elapsed);
//   },
//   RafPriority.FIRST
// );

const { scrollToTop, resize } = useStoreScroll()

flowProvider.registerScrollInterface({
  resize: resize,
  scrollToTop: () => {
    scrollToTop()
  },
});
</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.app__wrapper {
  font-size: $font-size;

  &.hover {
    cursor: pointer;
  }
}
</style>
