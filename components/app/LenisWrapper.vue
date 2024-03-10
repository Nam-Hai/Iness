<template>
</template>

<script lang="ts" setup>
import Lenis from '@studio-freight/lenis';

// const {propName = fallbackValue} = defineProps<{propName: type}>()
// const emits = defineEmits([])

const wrapperRef = ref() as Ref<HTMLElement>
onBeforeMount(() => {
    const lenis = new Lenis({
        normalizeWheel: true,
        smoothTouch: false,
        syncTouch: true,
        wheelMultiplier: 0.82,
        touchMultiplier: 1.7,
    })
})

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.lenis__wrapper {}
</style>
