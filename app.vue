<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>

  </div>
</template>

<script setup lang="ts">
import { FlowProvider, provideFlowProvider, useFlowProvider } from './waterflow/FlowProvider';
import Index from './pages/index.vue';

provideFlowProvider()
const flowProvider = useFlowProvider()

flowProvider.registerPage('index', Index)

const { flowIsHijacked } = useStore()
watch(flowProvider.flowIsHijacked, (flow) => {
  flowIsHijacked.value = flow
})


onBeforeMount(() => {
  useStoreView().init()

  if (!process.client) return

  const matcher = window.matchMedia('(prefers-color-scheme: dark)');
  if (matcher.matches) {
    const els = N.getAll('link.light')
    for (const el of els) {
      el.remove()
    }
  } else {
    const els = N.getAll('link.dark')
    for (const el of els) {
      el.remove()
    }
  }

  const m = window.matchMedia('(pointer: coarse)').matches
  const { isMobile } = useStore()
  isMobile.value = m
})

// useRO(() => {
//   if (!process.client) return
//   const m = window.matchMedia('(pointer: coarse)').matches
//   const { isMobile, firstRedirect } = useStore()
//   isMobile.value = m
// })

</script>
