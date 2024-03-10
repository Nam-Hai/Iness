<template>
  <div class="app__wrapper">
    <Menu />
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

useRaf(
  (e) => {
    // !flowProvider.flowIsHijacked.value && 
  },
  RafPriority.FIRST
);
</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.app__wrapper.hover {
  cursor: pointer;
}
</style>
