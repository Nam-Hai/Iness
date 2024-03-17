<template>
    <div class="placeholder" ref="placeholderRef">

    </div>
    <div class="wrapper" ref="wrapperRef">
        <div class="image__wrapper noselect" @click="currentImage = N.mod(currentImage + 1, props.length)"
            :data-column="project.column" v-for="(project, index) in props"
            :class="{ show: index === currentImageShow }">
            <img :src="project.url" :alt="project.alt" ref="imageRefs"
                :style="{ aspectRatio: project.dimensions.width / project.dimensions.height }">

            <span class="overflow">
                <span class="overflow-content" ref="indexRef">
                    {{ index + 1 }} / {{ props.length }}
                </span>
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onFlow, onLeave } from '~/waterflow/composables/onFlow';

const { props } = defineProps<{ props: ProjectImage[] }>()
const wrapperRef = ref() as Ref<HTMLElement>
const indexRef = ref() as Ref<HTMLElement[]>
const imageRefs = ref() as Ref<HTMLElement[]>
const bounds = ref() as Ref<DOMRect[]>
const placeholderRef = ref() as Ref<HTMLElement>

useRO(() => {
    bounds.value = imageRefs.value.map(el => {
        return el.getBoundingClientRect()
    })
    placeholderRef.value.style.transform = `translate(${bounds.value[currentImage.value].x}px, ${bounds.value[currentImage.value].y}px)  scale(${bounds.value[currentImage.value].width / 100}, ${bounds.value[currentImage.value].height / 100}) `
    placeholderPos.w = bounds.value[currentImage.value].width
    placeholderPos.h = bounds.value[currentImage.value].height
    placeholderPos.x = bounds.value[currentImage.value].x
    placeholderPos.y = bounds.value[currentImage.value].y
})

const currentImage = ref(0)
const currentImageShow = ref(0)
let motion = useMotion({})
let placeholderPos = { x: 0, y: 0, w: 0, h: 0 }
watch(currentImage, (to) => {
    motion.pause();

    const boundsTo = bounds.value[to]
    const from = placeholderPos

    currentImageShow.value = -1
    motion = useMotion({
        d: 1000,
        e: 'i3',
        delay: 180,
        update({ prog, progE }) {
            const x = N.Lerp(from.x, boundsTo.x, progE)
            const y = N.Lerp(from.y, boundsTo.y, progE)
            const w = N.Lerp(from.w, boundsTo.width, progE)
            const h = N.Lerp(from.h, boundsTo.height, progE)
            placeholderPos.x = x
            placeholderPos.y = y
            placeholderPos.w = w
            placeholderPos.h = h
            placeholderRef.value.style.transform = `translate(${x}px, ${y}px) scale(${w / 100}, ${h / 100})`

        },
        cb() {
            currentImageShow.value = to
        },
    });
    motion.play()
})

onLeave(() => {
    useTL().from({
        el: wrapperRef.value,
        d: 200,
        e: 'o2',
        p: {
            o: [1, 0]
        }
    }).play()
})
</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

$showDuration: 200ms;
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
}

.wrapper {
    @include full();
    pointer-events: none;
}

.image__wrapper {
    pointer-events: all;
    position: absolute;
    margin: $main-margin;
    right: 0;
    top: 0;
    // width: calc($grid-cell-width * 4);
    // cursor: pointer;
    opacity: 0;
    height: calc(100% - $main-margin * 2);
    // transition: opacity 200ms;

    transition: opacity $showDuration;


    cursor: e-resize;

    &.show {
        opacity: 1;

        .overflow-content {
            transform: translateY(0%);
        }
    }

    &[data-column="1"] {
        width: calc($grid-cell-width);
    }

    &[data-column="2"] {
        width: calc($grid-cell-width * 2);
    }

    &[data-column="3"] {
        width: calc($grid-cell-width * 3);
    }

    &[data-column="4"] {
        width: calc($grid-cell-width * 4);
    }

    img {
        width: 100%;
        max-height: calc(100% - 3rem);
        // height: calc($grid-cell-height * 2);
        margin-bottom: 1.6rem;

        max-width: 100%;

    }

    .overflow-content {
        transition: transform 500ms ease-in-out;
    }
}
</style>
