<template>
    <div ref="wrapperRef" class="preloader__wrapper" v-if="!killPreloader">
        <div class="logo">
            <div>
                Preloader
            </div>
        </div>
    </div>
    <slot v-if="preloaderComplete" />
</template>

<script lang="ts" setup>
const wrapperRef = ref()

const killPreloader = ref(false)

const { preloaderComplete, fromPreloader, loadPrismic } = usePreloader()


watch(preloaderComplete, async () => {
    await nextTick()

    fromPreloader.value = false
    killPreloader.value = true

})


onMounted(() => {
    loadPrismic().then(endPreloader)
})

function endPreloader() {
    preloaderComplete.value = true
    N.Class.add(wrapperRef.value, 'hide')
}

</script>

<style scoped lang="scss">
@use "@/styles/shared.scss" as *;

.preloader__wrapper {
    pointer-events: none;
    position: fixed;
    z-index: 50;
    top: 0;
    left: 0;
    line-height: 100%;
    height: 100%;
    width: 100%;

}
</style>
