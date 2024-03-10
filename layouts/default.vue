<template>
  <div class="app__wrapper">
    <Menu />
    <!-- <LenisWrapper /> -->
    <div class="page__wrapper">
      <BufferPage />
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
    lenis.raf(e.elapsed);
  },
  RafPriority.FIRST
);

const lenis = new Lenis({
  normalizeWheel: true,
  smoothTouch: false,
  syncTouch: true,
  wheelMultiplier: 0.82,
  touchMultiplier: 1.7,
})

flowProvider.registerScrollInterface({
  resume: () => {
    lenis.start();
  },
  stop: () => {
    lenis.stop();
  },
  resize: () => {
    lenis.resize();
  },
  scrollToTop: () => {
    lenis.scrollTo("top", { immediate: true, force: true });
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
