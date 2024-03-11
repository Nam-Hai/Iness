<template>
    <main ref="wrapperRef">
        <div class="placeholder" ref="placeholderRef">
        </div>

        <div class="project__wrapper">
            <img :src="img.image" v-for="(img, index) in prismicData" :key="img.alt + '_' + index"
                :class="{ show: currentImageShow === index }" />
        </div>
    </main>
</template>

<script lang="ts" setup>
const wrapperRef = ref() as Ref<HTMLElement>

const { prismicData } = usePreloader()
const { vh, vw } = useStoreView()

const currentImage = ref(0)

const { removeListener } = useEventListeneer(document, "click", (e) => {
    currentImage.value = (currentImage.value + 1) % prismicData.value.length
})

const currentImageShow = ref(0)
const placeholderRef = ref() as Ref<HTMLElement>

onMounted(() => {
    placeholderRef.value.style.transform = `translate(-50%, -50%) scale(${placeholderDim.value.width / 10}, ${placeholderDim.value.height / 10})`
    placeholderPos.w = placeholderDim.value.width / 10
    placeholderPos.h = placeholderDim.value.height / 10
})

const placeholderPos = {
    w: 1,
    h: 1
}
let motion = useMotion({})
watch(currentImage, index => {
    const fromW = placeholderPos.w
    const fromH = placeholderPos.h
    const toW = placeholderDim.value.width / 10
    const toH = placeholderDim.value.height / 10

    const el = placeholderRef.value

    motion.pause()

    currentImageShow.value = -1
    motion = useMotion({
        delay: 150,
        d: 500,
        e: 'io2',
        update({ prog, progE }) {
            if (!el) return

            const w = N.Lerp(fromW, toW, progE)
            const h = N.Lerp(fromH, toH, progE)
            placeholderPos.w = w
            placeholderPos.h = h
            el.style.transform = `translate(-50%, -50%) scale(${w}, ${h})`
        },
        cb() {
            currentImageShow.value = index
        },
    })
    motion.play()
})

const placeholderDim = computed(() => {
    const width = prismicData.value[currentImage.value].dimensions.width
    const height = prismicData.value[currentImage.value].dimensions.height

    const a = width / (vw.value * 0.8)
    const b = height / (vh.value * 0.95)

    const w = Math.min(width, vw.value * 0.8)
    const h = Math.min(height, vh.value * 0.95)

    if (a < 1 && b < 1) {
        return {
            width: w,
            height: h
        }
    }
    else if (a < b) {
        return {
            width: w / b,
            height: h
        }
    } else {
        return {
            width: w,
            height: h / a
        }
    }
})

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

main {
    $showDuration: 150ms;
    $showTransition: 200ms;
    $showSum: $showDuration + $showTransition;

    .placeholder {
        position: absolute;
        height: 10px;
        width: 10px;
        background-color: $primary;

        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        // transition: transform $showTransition $showDuration;
    }

    .project__wrapper {
        position: absolute;
        inset: 0;

        img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            object-fit: cover;
            max-width: 80vw;
            max-height: 95vh;

            opacity: 0;
            // transition: opacity $showDuration 0ms;
            transition: opacity $showDuration;

            &.show {
                // transition: opacity $showDuration $showSum;
                opacity: 1;
            }
        }
    }
}
</style>
