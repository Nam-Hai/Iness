<template>
    {{ debug }}
    {{ currentImage }}
    {{ currentImageShow }}
    <div class="project__wrapper" ref="wrapperRef" :class="{ desktop: !isMobile }">
        <div class="column__wrapper" v-for="(d, index) in data.slice(0, 9)" :key="d.image.name + '_' + index"
            @mouseenter="() => { currentImage = index; currentImageShow = index }" @mousemove="mediaMove($event, index)"
            :class="{ show: currentImageShow === index, loaded: true }" ref="mediaWrapperRef">
            <IMediaOverview :props="d.image" v-if="breakpoint === 'desktop'"></IMediaOverview>
            <IMediaOverview :props="d.image_mobile" v-else></IMediaOverview>
        </div>
    </div>
</template>

<script lang="ts" setup>
const wrapperRef = ref() as Ref<HTMLElement>

const { prismicData } = usePreloader()
const { vh, vw, breakpoint, scale } = useStoreView()
const { isMobile } = useStore()
const data = prismicData.value.overview

const medias: { value: HTMLElement[] } = { value: [] }
onMounted(() => {
    getMedia()
})

watch(breakpoint, async () => {
    await nextTick()
    getMedia()
})

function getMedia() {
    medias.value = N.getAll(".lib-media .container", wrapperRef.value) as unknown as HTMLElement[]
}

const debug = ref({ x: 0, y: 0 })
function mediaMove(e: MouseEvent, index: number) {
    const el = medias.value[index]
    if (breakpoint.value === "desktop") {
        const h = el.offsetHeight
        el.style.transform = `translate(0, calc(${N.Clamp(e.pageY, h / 2 + 20, vh.value - h / 2 - 10)}px - 50% - 2rem))`
    } else {
        const w = el.offsetWidth
        el.style.transform = `translate(calc(${N.Clamp(e.pageX - vw.value, -vw.value + w / 2 + 10, -w / 2 - 20,)}px + 50% + 2rem), 0)`
    }
}

const d = ref()
useEventListeneer(wrapperRef, 'touchstart', (e: Event) => {
    const mouse = {
        x: (e as TouchEvent).touches[0].pageX,
        y: (e as TouchEvent).touches[0].pageY
    }
    const a = Object.assign(e, { pageX: mouse.x, pageY: mouse.y }) as MouseEvent
    onTouch(mouse)
    mediaMove(a, currentImage.value)
})

useEventListeneer(wrapperRef, 'touchmove', (e: Event) => {
    const mouse = {
        x: (e as TouchEvent).touches[0].pageX,
        y: (e as TouchEvent).touches[0].pageY
    }
    debug.value = { ...mouse }
    const a = Object.assign(e, { pageX: mouse.x, pageY: mouse.y }) as MouseEvent
    d.value = a
    onTouch(mouse)
    mediaMove(a, currentImage.value)
})

function onTouch({ x, y }: { x: number, y: number }) {
    const r = N.Clamp((y - 16) / (vh.value - 32), 0, 1)

    currentImage.value = N.Clamp(Math.floor(r * 8), 0, Math.min(data.length - 1, 7))
    currentImageShow.value = currentImage.value
}

const currentImage = ref(0)
const imageRef = ref() as Ref<HTMLElement[]>


const currentImageShow = ref(0)

// watch(currentImage, index => {
//     if (index === -1) return

//     currentImageShow.value = index
// })
</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.project__wrapper {
    position: fixed;
    inset: 0;

    @include breakpoint(desktop) {
        @include gridColumnNoGap();
    }

    padding-top: $main-margin;
    grid-auto-flow: row dense;

    @include breakpoint(mobile) {
        display: flex;
        flex-direction: column;

        .column__wrapper {
            height: calc((var(--100vh) - 2 * $main-margin) * 0.25 * 0.5) !important;
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

        @include breakpoint(mobile) {
            &:nth-child(9) {
                display: none;
            }
        }

        &.loaded.show {
            opacity: 1;
        }
    }

    .column__wrapper {
        transition: opacity 0ms 1000ms;

        &.loaded.show {
            transition: opacity 0ms 0ms;
        }
    }

    .lib-media {
        // background-color: $primary;

        pointer-events: none;

        @include breakpoint(desktop) {
            width: 100%;
        }

    }
}
</style>
