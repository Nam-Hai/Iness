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
import Lenis from "@studio-freight/lenis";
import { RafPriority } from "~/plugins/core/raf";
import { useFlowProvider } from "~/waterflow/FlowProvider";
import BufferPage from "~/waterflow/components/BufferPage.vue";

const flowProvider = useFlowProvider();

useRaf(
  (e) => {
    // !flowProvider.flowIsHijacked.value && 
    lenis.value.raf(e.elapsed);
  },
  RafPriority.FIRST
);

const { lenis } = useStoreView()

flowProvider.registerScrollInterface({
  resume: () => {
    lenis.value.start();
  },
  stop: () => {
    lenis.value.stop();
  },
  resize: () => {
    lenis.value.resize();
  },
  scrollToTop: () => {
    lenis.value.scrollTo("top", { immediate: true, force: true });
  },
});
</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.app__wrapper {
  font-size: 1.2rem;

  &.hover {
    cursor: pointer;
  }
}
</style>
