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
import info from './pages/info.vue';
import Projects from './pages/projects/index.vue';
import ProjectsID from './pages/projects/[...id].vue';

provideFlowProvider()
const flowProvider = useFlowProvider()

flowProvider.registerPage('index', Index)
flowProvider.registerPage('projects', Projects)
flowProvider.registerPage('projects-id', ProjectsID)
flowProvider.registerPage('info', info)

const { flowIsHijacked } = useStore()
watch(flowProvider.flowIsHijacked, (flow) => {
  flowIsHijacked.value = flow
})

const { resetCount } = useStoreTransition()
const routeTo = flowProvider.getRouteTo()
watch(routeTo, () => {
  resetCount()
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
})

useRO(() => {
  const m = window.matchMedia('(pointer: coarse)').matches
  const { isMobile } = useStore()
  isMobile.value = m
})
</script>
