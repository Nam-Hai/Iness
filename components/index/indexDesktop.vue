<template>
    <div class="placeholder" ref="placeholderRef">
    </div>

    <div class="project__wrapper">
        <img :src="img.src" v-for="(img, index) in data" :key="img.alt + '_' + index"
            :class="{ show: currentImageShow === index, loaded: img.load }" @load="() => {
            console.log('load');
            img.load.value = true
        }" ref="imageRef" />
    </div>
</template>

<script lang="ts" setup>
import { useFlowProvider } from '~/waterflow/FlowProvider';
import { onLeave } from '~/waterflow/composables/onFlow';

const wrapperRef = ref() as Ref<HTMLElement>

const { prismicData } = usePreloader()
const data = prismicData.value.map(el => {
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
const { isMobile } = useStore()
const flowProvider = useFlowProvider()

const currentImage = ref(0)
const imageRef = ref() as Ref<HTMLElement[]>

const D = 30
let i = 0

useEventListeneer(document, "mousemove", (e) => {
    if (isMobile.value || flowProvider.flowIsHijacked.value) return motion.pause()
    i++
    if (i > D) {
        currentImage.value = (currentImage.value + 1) % prismicData.value.length
        i = 0
    }
})
useEventListeneer(document, "click", (e) => {
    if (!isMobile.value || flowProvider.flowIsHijacked.value) return motion.pause()
    currentImage.value = (currentImage.value + 1) % prismicData.value.length
})

const currentImageShow = ref(0)
const placeholderRef = ref() as Ref<HTMLElement>

onMounted(() => {
    const dim = getImageDOMRect(currentImageShow.value)
    placeholderRef.value.style.transform = `translate(-50%, -50%) scale(${dim.w / 100}, ${dim.h / 100})`
    placeholderPos.w = dim.w
    placeholderPos.h = dim.h
})

const placeholderPos = {
    w: 1,
    h: 1
}
let motion = useMotion({})
watch(currentImage, index => {
    const fromW = placeholderPos.w
    const fromH = placeholderPos.h
    // const toW = placeholderDim.value.width / 10
    // const toH = placeholderDim.value.height / 10
    const { w: toW, h: toH, x: toX, y: toY } = getImageDOMRect(index)

    const el = placeholderRef.value

    motion.pause()

    currentImageShow.value = -1
    motion = useMotion({
        delay: 100,
        d: 500,
        e: 'io3',
        update({ prog, progE }) {
            if (!el) return

            const w = N.Lerp(fromW, toW, progE)
            const h = N.Lerp(fromH, toH, progE)
            placeholderPos.w = w
            placeholderPos.h = h
            el.style.transform = `translate(-50%, -50%) scale(${w / 100}, ${h / 100})`
        },
        cb() {
            currentImageShow.value = index
        },
    })
    motion.play()
})

useRO(() => {
    if (!placeholderRef.value) return
    computeImgPosition()
    // placeholderRef.value.style.transform = `translate(-50%, -50%) scale(${placeholderDim.value.width / 10}, ${placeholderDim.value.height / 10})`
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
    console.log(data);
}
</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

$showDuration: 150ms;
$showTransition: 200ms;
$showSum: $showDuration + $showTransition;

.placeholder {
    position: absolute;
    height: 100px;
    width: 100px;
    background-color: $primary;

    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    // transition: transform $showTransition $showDuration;
}

.project__wrapper {
    position: absolute;
    inset: 0;
    @include mainGrid();
    grid-auto-flow: row dense;

    img {
        width: 100%;
        object-fit: cover;
        max-width: 80vw;
        max-height: 95vh;

        opacity: 0;
        // transition: opacity $showDuration 0ms;
        transition: opacity $showDuration;

        &.loaded.show {
            // transition: opacity $showDuration $showSum;
            opacity: 1;
        }
    }
}
</style>
