<template>
    <div class="project__wrapper" ref="wrapperRef">
        <div class="column__wrapper" v-for="(d, index) in data.slice(0, 9).sort((a, b)=> a.order - b.order)" :key="d.image.name + '_' + index"
            @mouseenter="() => { currentImage = index }" :class="{ show: currentImageShow === index, loaded: true }">
            <IMedia :props="d.image"></IMedia>
            <!-- <img :src="img.src" :class="{ show: currentImageShow === index, loaded: img.load }" @load="() => {
                img.load.value = true
            }" ref="imageRef" v-leave-img /> -->
        </div>
    </div>
</template>

<script lang="ts" setup>
import { vLeave, vLeaveImg } from '~/directives/leave';
const wrapperRef = ref() as Ref<HTMLElement>

const { prismicData } = usePreloader()
const { vh, breakpoint } = useStoreView()
const data = prismicData.value.overview
console.log(data);

useEventListeneer(wrapperRef, 'touchstart', (e: Event) => {
    const mouse = {
        x: (e as TouchEvent).touches[0].clientX,
        y: (e as TouchEvent).touches[0].clientY
    }
    onTouch(mouse)
})

useEventListeneer(wrapperRef, 'touchmove', (e) => {
    const mouse = {
        x: (e as TouchEvent).touches[0].clientX,
        y: (e as TouchEvent).touches[0].clientY
    }
    onTouch(mouse)
})

function onTouch({ x, y }: { x: number, y: number }) {
    const r = N.Clamp((y - 16) / (vh.value - 32), 0, 1)

    currentImage.value = N.Clamp(N.mod(Math.floor(r * 8), 8), 0, data.length - 1)
}

const currentImage = ref(0)
const imageRef = ref() as Ref<HTMLElement[]>


const currentImageShow = ref(0)

watch(currentImage, index => {
    if (index === -1) return

    currentImageShow.value = index
})
</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

$showDuration: 0ms;
$showTransition: 0ms;
$showSum: $showDuration + $showTransition;


.project__wrapper {
    position: fixed;
    inset: 0;

    @include breakpoint(desktop) {
        @include gridColumn();
    }

    padding-top: $main-margin;
    grid-auto-flow: row dense;

    @include breakpoint(mobile) {
        display: flex;
        flex-direction: column;

        .column__wrapper {
            height: calc((100vh - 2 * $main-margin) * 0.25 * 0.5) !important;
            padding-right: $main-margin;
            display: flex;
            justify-content: flex-end;

            img {
                height: 100%;
            }
        }
    }

    .column__wrapper {
        width: 100%;
        height: calc(100% - $main-margin);

        opacity: 0;

        &.loaded.show {
            opacity: 1;
        }
    }

    .lib-media {
        // background-color: $primary;

        @include breakpoint(desktop) {
            width: 100%;
        }

    }
}
</style>
