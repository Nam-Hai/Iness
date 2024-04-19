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
        touchInertiaMultiplier: 20, 
        wheelMultiplier: 1,
        touchMultiplier: 1,
    })
    lenis.start()

    const raf = useRafR(({ elapsed }) => {
        lenis.raf(elapsed)
    }).run()
    lenis.on("scroll", (e) => {
    })
})

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.lenis__wrapper {}
</style>
