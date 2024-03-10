<template>
  <div class="app__wrapper">
    <div class="page__wrapper">
      <BufferPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RafPriority } from "~/plugins/core/raf";
import { useFlowProvider } from "~/waterflow/FlowProvider";
import BufferPage from "~/waterflow/components/BufferPage.vue";

const flowProvider = useFlowProvider();

const { lenis, scrollLenisOn } = useStoreView();
const { isMobile } = useStore()

useRaf(
  (e) => {
    // !flowProvider.flowIsHijacked.value && 
    lenis.value.raf(e.elapsed);
  },
  RafPriority.FIRST
);

flowProvider.registerScrollInterface({
  resume: () => {
    scrollLenisOn.value = true
    lenis.value.start();
  },
  stop: () => {
    scrollLenisOn.value = false
    lenis.value.stop();
  },
  scrollToTop: () => {
    lenis.value.scrollTo("top", { immediate: true, force: true });
  },
});
</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.app__wrapper.hover {
  cursor: pointer;
}
</style>
