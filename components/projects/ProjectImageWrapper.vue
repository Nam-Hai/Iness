<template>
    <div id="project-image__placeholder" :class="{ onflow: flow }" ref="placeholderRef">

    </div>
    <div class="wrapper" ref="wrapperRef">
        <div class="image__wrapper noselect"
            @click="currentImage = N.mod(currentImage + 1, props.project_images.length)" :data-column="project.column"
            v-for="(project, index) in props.project_images"
            :class="{ show: index === currentImageShow, onflow: flow }">
            <img :src="project.url" :alt="project.alt" ref="imageRefs"
                :style="{ aspectRatio: project.dimensions.width / project.dimensions.height }">

            <span class="overflow">
                <span class="overflow-content" ref="indexRef">
                    {{ index + 1 }} / {{ props.project_images.length }}
                </span>
            </span>
        </div>
    </div>

    <div class="project-info" v-if="breakpoint === 'mobile'">
        <NuxtLink to="/projects" class="back">Back to index</NuxtLink>

        <div class="info__wrapper">
            <span v-streamed-text>{{ props.title }}</span>
            <span v-streamed-text>{{ props.client }}</span>
            <span v-streamed-text>{{ props.type }}</span>
            <span v-streamed-text>{{ props.date }}</span>
        </div>
        <div class="description">
            Je crée des systems identitaire a travers le design, des systems scalable et logique, qui permettent au
            design de s’exprimer, en creeant des accidents ou pas, tout depend de la perfection du system. Je crée
            des systems identitaire a travers le design, des systems scalable et logique, qui permettent au design
            de s’exprimer, en creeant des accidents ou pas, tout depend de la perfection du system.
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onFlow, onLeave } from '~/waterflow/composables/onFlow';
import { vStreamedText } from '~/directives/streamedText';

const { props } = defineProps<{ props: ProjectData }>()
const wrapperRef = ref() as Ref<HTMLElement>
const indexRef = ref() as Ref<HTMLElement[]>
const imageRefs = ref() as Ref<HTMLElement[]>
const placeholderRef = ref() as Ref<HTMLElement>
const { placeholderPos, placeholderPosFrom, bounds } = useStoreProjectImage()
const { breakpoint } = useStoreView()
onMounted(() => {
    bounds.value = imageRefs.value.map(el => {
        return el.getBoundingClientRect()
    })
})
const flow = onFlow(() => {

})

useRO(() => {
    bounds.value = imageRefs.value.map(el => {
        return el.getBoundingClientRect()
    })
    if (!flow.value) return
    placeholderRef.value.style.transform = `translate(${bounds.value[currentImage.value].x}px, ${bounds.value[currentImage.value].y}px)  scale(${bounds.value[currentImage.value].width / 100}, ${bounds.value[currentImage.value].height / 100}) `
    placeholderPos.w = bounds.value[currentImage.value].width
    placeholderPos.h = bounds.value[currentImage.value].height
    placeholderPos.x = bounds.value[currentImage.value].x
    placeholderPos.y = bounds.value[currentImage.value].y
})

const currentImage = ref(0)
const currentImageShow = ref(0)
let motion = useMotion({})

watch(currentImage, (to) => {
    motion.pause();

    const boundsTo = bounds.value[to]
    const from = placeholderPos

    currentImageShow.value = -1
    motion = useMotion({
        d: 600,
        e: 'io3',
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
    placeholderPosFrom.value = bounds.value[currentImage.value]
    useTL().from({
        el: wrapperRef.value,
        d: 200,
        e: 'o2',
        p: {
            o: [1, 0]
        },
        cb() {
            N.O(placeholderRef.value, 0)
        },
    }).play()
})
</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

$showDuration: 200ms;
$showTransition: 200ms;
$showSum: $showDuration + $showTransition;

#project-image__placeholder {
    position: absolute;
    height: 100px;
    width: 100px;
    // background-color: $primary;
    background-color: $placeholder-rect-secondary;

    left: 0;
    top: 0;
    transform-origin: left top;

    opacity: 0;

    &.flow {
        opacity: 1;
    }
}

.wrapper {


    @include full();
    pointer-events: none;
}

.project-info {
    .back {
        position: fixed;
        top: calc(2 * $grid-cell-height);
        left: $main-margin;
    }

    line-height: 130%;

    .info__wrapper {
        margin-top: calc(3 * $grid-cell-height - $main-margin);
        display: flex;
        flex-direction: column;
        margin-bottom: 1.6rem;
    }

    .info__wrapper,
    .description {
        left: calc(5 * $grid-cell-width + $main-margin);
        width: calc(4 * $grid-cell-width);
        position: relative;

        display: flex;
        flex-direction: column;
        text-transform: capitalize;
    }

    .description {
        // font-size: 5rem;
        margin-bottom: calc($grid-cell-height + $main-margin);
    }
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

    @include breakpoint(desktop) {
        height: calc(100% - $main-margin * 2);
    }

    // transition: opacity 200ms;

    transition: opacity $showDuration;

    @include breakpoint(mobile) {
        width: calc(100% - 2 * main-margin);
        position: fixed;
    }


    cursor: e-resize;

    &.show.onflow {
        opacity: 1;

        .overflow-content {
            transform: translateY(0%);
        }
    }

    @include breakpoint(desktop) {
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
    }


    img {
        width: 100%;
        max-height: calc(100% - 3rem);
        // height: calc($grid-cell-height * 2);
        margin-bottom: 1.6rem;

        max-width: 100%;
    }

    .overflow {
        @include breakpoint(mobile) {
            position: fixed;
            top: calc(3 * $grid-cell-height);
            left: $main-margin;

            .overflow-content {
                transition-duration: 0ms;
            }
        }
    }

    .overflow-content {
        transition: transform 500ms ease-in-out;
    }
}
</style>
