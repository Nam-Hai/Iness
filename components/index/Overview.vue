<template>
    <div class="project__wrapper" ref="wrapperRef" v-leave>
        <div class="column__wrapper" v-for="(img, index) in data" :key="img.alt + '_' + index"
            @mouseenter="() => { currentImage = index }">
            <img :src="img.src" :class="{ show: currentImageShow === index, loaded: img.load }" @load="() => {
            img.load.value = true
        }" ref="imageRef" :style="{ aspectRatio: img.dimensionsNative.width / img.dimensionsNative.height }" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { vLeave } from '~/directives/leave';
const wrapperRef = ref() as Ref<HTMLElement>

const { prismicData } = usePreloader()
const { vh, breakpoint } = useStoreView()
const data = prismicData.value.overview.map(el => {
    return {
        src: el.image,
        dimensionsNative: el.dimensions,
        domRect: {
            h: 1,
            w: 1,
            x: 0,
            y: 0,
        },
        alt: el.alt,
        load: ref(false)
    }
})

const dragAPI = useDrag({ wrapper: wrapperRef }, (e) => {
    if (breakpoint.value === "desktop") return
})
watch(dragAPI.on, (b) => {
    if (breakpoint.value === "desktop") return
    if (b) {
        currentImageShow.value = -1
        currentImage.value = -1
    }
})

const currentImage = ref(0)
const imageRef = ref() as Ref<HTMLElement[]>


const currentImageShow = ref(0)

onMounted(async () => {
    computeImgPosition()
})

watch(currentImage, index => {
    if (index === -1) return

    currentImageShow.value = index
})

useRO(() => {
    computeImgPosition()
})

function getImageDOMRect(index: number) {
    return data[index].domRect
}
function computeImgPosition() {
    for (let index = 0; index < data.length; index++) {
        const el = imageRef.value[index]
        const domRec = el.getBoundingClientRect()
        const ratio = data[index].dimensionsNative.height / data[index].dimensionsNative.width
        data[index].domRect.h = domRec.width * ratio
        data[index].domRect.w = domRec.width
        data[index].domRect.x = domRec.x
        data[index].domRect.y = domRec.y
    }
}
</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

$showDuration: 0ms;
$showTransition: 0ms;
$showSum: $showDuration + $showTransition;

.placeholder {
    position: absolute;
    height: 100px;
    width: 100px;
    background-color: $primary;

    left: 0;
    top: 0;
    transform-origin: left top;

    // transition: transform $showTransition $showDuration;
}

.project__wrapper {
    position: absolute;
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
    }

    img {
        @include breakpoint(desktop) {
            width: 100%;
        }

        object-fit: cover;
        opacity: 0;
        // transition: opacity $showDuration 0ms;
        // transition: opacity $showDuration;

        &.loaded.show {
            // transition: opacity 300ms;
            // transition: opacity $showDuration $showSum;
            opacity: 1;
        }
    }
}
</style>
