<template>
    <div class="placeholder" ref="placeholderRef">
    </div>

    <div class="project__wrapper" ref="wrapperRef">
        <div class="column__wrapper" v-for="(img, index) in data" :key="img.alt + '_' + index"
            @mouseenter="() => { currentImage = index }">
            <img :src="img.src" :class="{ show: currentImageShow === index, loaded: img.load }" @load="() => {
            img.load.value = true
        }" ref="imageRef" :style="{ aspectRatio: img.dimensionsNative.width / img.dimensionsNative.height }" />
        </div>
    </div>
</template>

<script lang="ts" setup>
const wrapperRef = ref() as Ref<HTMLElement>

const { prismicData } = usePreloader()
const { vh } = useStoreView()
const p = [...prismicData.value, ...prismicData.value]
const data = p.map(el => {
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
    placeholderRef.value.style.transform = `translate(${placeholderPos.x}px, ${placeholderPos.y + e.y}px)  scale(${placeholderPos.w / 100}, ${placeholderPos.h / 100}) `

})
watch(dragAPI.on, (b) => {
    if (b) {
        currentImageShow.value = -1
        currentImage.value = -1
    } else {
        placeholderPos.y += dragAPI.distance.y
        currentImage.value = N.Clamp(Math.round(placeholderPos.y / vh.value * 8), 0, data.length - 1)
    }
})

const currentImage = ref(0)
const imageRef = ref() as Ref<HTMLElement[]>


const currentImageShow = ref(0)
const placeholderRef = ref() as Ref<HTMLElement>

onMounted(async () => {
    computeImgPosition()
    const dim = getImageDOMRect(currentImageShow.value)
    placeholderRef.value.style.transform = `translate(${dim.x}px, ${dim.y}px)  scale(${dim.w / 100}, ${dim.h / 100}) `
    placeholderPos.w = dim.w
    placeholderPos.h = dim.h
    placeholderPos.x = dim.x
    placeholderPos.y = dim.y
})

const placeholderPos = {
    w: 1,
    h: 1,
    x: 0,
    y: 0
}
let motion = useMotion({})
watch(currentImage, index => {
    if (index === -1) return
    const fromW = placeholderPos.w
    const fromH = placeholderPos.h
    const fromX = placeholderPos.x
    const fromY = placeholderPos.y
    const { w: toW, h: toH, x: toX, y: toY } = getImageDOMRect(index)
    const el = placeholderRef.value

    motion.pause()

    currentImageShow.value = -1
    motion = useMotion({
        delay: 100,
        d: 500,
        e: 'o2',
        update({ prog, progE }) {
            if (!el) return

            const w = N.Lerp(fromW, toW, progE)
            const h = N.Lerp(fromH, toH, progE)
            const x = N.Lerp(fromX, toX, progE)
            const y = N.Lerp(fromY, toY, progE)
            placeholderPos.w = w
            placeholderPos.h = h
            placeholderPos.x = x
            placeholderPos.y = y
            placeholderRef.value.style.transform = `translate(${x}px, ${y}px) scale(${w / 100}, ${h / 100})`
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
    const dim = getImageDOMRect(currentImageShow.value)
    placeholderPos.w = dim.w
    placeholderPos.h = dim.h
    placeholderPos.x = dim.x
    placeholderPos.y = dim.y

    placeholderRef.value.style.transform = `translate(${dim.x}px, ${dim.y}px)  scale(${dim.w / 100}, ${dim.h / 100}) `
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

$showDuration: 140ms;
$showTransition: 200ms;
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
        transition: opacity $showDuration;

        &.loaded.show {
            transition: opacity 300ms;
            // transition: opacity $showDuration $showSum;
            opacity: 1;
        }
    }
}
</style>
