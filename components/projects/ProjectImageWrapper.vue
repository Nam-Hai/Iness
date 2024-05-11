<template>
    <div class="wrapper " ref="wrapperRef" :class="{ 'cursor-resize': props.project_images.length > 1 }"
        @click="$event.stopPropagation(); currentImage = N.mod(currentImage + 1, props.project_images.length)">
        <div class="image__wrapper noselect" :data-column="project.column"
            v-for="(project, index) in props.project_images" :class="{ show: index === currentImageShow }"
            :key="project.image.id + '__' + index">

            <div class="image" v-leave>
                <ImgWrapper :props="project.image" :controller="project.controller" v-if="currentImage === index" />
            </div>

            <span class="overflow" v-if="!next && props.project_images.length > 1 && breakpoint === 'desktop'"
                v-leave-text>
                <span v-streamed-text="0">{{ index + 1 }}</span><span v-streamed-text="0">/</span><span
                    v-streamed-text="0">{{
                        props.project_images.length }}</span>

                <span style="margin-left: 1rem;" v-streamed-text="1">Next image</span>
            </span>
        </div>
    </div>

    <div class="project-info" v-if="breakpoint === 'mobile'">
        <NuxtLink to="/projects" class="back" v-streamed-text v-leave-text>Back to index</NuxtLink>

        <div class="info__wrapper">
            <span v-streamed-text v-leave-text>{{ props.title }}</span>
            <span v-streamed-text v-leave-text>{{ props.client }}</span>
            <span v-streamed-text v-leave-text>{{ props.type }}</span>
            <span v-streamed-text v-leave-text>{{ props.date }}</span>
        </div>
        <div class="description" v-streamed-text="0" v-if="currentImageShow !== -1" v-leave-text>
            {{ props.project_images[currentImage]?.description || "" }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { vStreamedText } from '~/directives/streamedText';
import { vLeave, vLeaveText } from '~/directives/leave'

const { props } = defineProps<{ props: ProjectData }>()
const wrapperRef = ref() as Ref<HTMLElement>
const { currentImage, currentImageShow, currentImageDelay } = useStoreProjectImage()
const { breakpoint } = useStoreView()
currentImage.value = 0
currentImageShow.value = 0
const next = ref(false)

watch(currentImage, async (to, from) => {
    const toI = props.project_images[to]
    const fromI = props.project_images[from]
    if (toI.description !== fromI.description) {
        currentImageShow.value = -1
    }
    next.value = true
    await nextTick()
    useDelay(100, () => {
        currentImageShow.value = to
        next.value = false
    })
})

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

$showDuration: 120ms;
$showTransition: 0ms;
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
}

.wrapper {
    position: fixed;
    top: 0;
    right: 0;
    font-size: $font-size;
    line-height: 1.6rem;

    width: calc(4 * $grid-cell-width + $main-margin);
    height: 100vh;
    // pointer-events: none;

    &.cursor-resize {

        cursor: e-resize;
    }

    @include breakpoint(mobile) {
        width: 100%;

        -webkit-touch-callout: none;
        /* iOS Safari */
        -webkit-user-select: none;
        /* Safari */
        -khtml-user-select: none;
        /* Konqueror HTML */
        -moz-user-select: none;
        /* Old versions of Firefox */
        -ms-user-select: none;
        /* Internet Explorer/Edge */
        user-select: none;
    }




    &.leave {
        transition: opacity 100ms;
        opacity: 0;
    }
}

.project-info {
    .back {
        position: fixed;
        top: calc(2 * $grid-cell-height + $main-margin);
        left: $main-margin;
    }

    font-size: $font-size;
    line-height: 1.6rem;

    .info__wrapper {
        @include breakpoint(mobile) {
            pointer-events: none;
        }

        margin-top: calc(3 * $grid-cell-height);
        display: flex;
        flex-direction: column;

        @include breakpoint(desktop) {
            margin-bottom: 1.2rem;
        }


        display: flex;
        flex-direction: column;
        // text-transform: capitalize;
    }

    .info__wrapper,
    .description {
        left: calc(5 * $grid-cell-width + $main-margin);
        width: calc(4 * $grid-cell-width);
        position: relative;

    }

    .description {
        @include breakpoint(mobile) {
            margin-top: 1.2rem;
        }

        // font-size: 5rem;
        // margin-bottom: calc($grid-cell-height + $main-margin);
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
    pointer-events: none;

    @include breakpoint(desktop) {
        height: calc(100% - $main-margin * 2);
    }

    // transition: opacity 200ms;

    transition: opacity $showDuration;

    @include breakpoint(mobile) {
        position: fixed;
        transition: 0ms;

        &[data-column="1"] {
            width: calc($grid-cell-width * 3);
        }

        &[data-column="2"] {
            width: calc($grid-cell-width * 4);
        }

        &[data-column="3"] {
            width: calc($grid-cell-width * 7);
        }

        &[data-column="4"] {
            width: calc($grid-cell-width * 9);
        }
    }



    &.show {
        pointer-events: all;
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
            width: calc($grid-cell-width * 2 - var(--grid-column-gap) * 0.5);
        }

        &[data-column="3"] {
            width: calc($grid-cell-width * 3 - var(--grid-column-gap) * 0.5);
        }

        &[data-column="4"] {
            width: calc($grid-cell-width * 4 - var(--grid-column-gap) * 0.5);
        }
    }


    .image {
        width: 100%;
        max-height: calc(100% - 3rem);
        // height: calc($grid-cell-height * 2);
        margin-bottom: 1.2rem;

        max-width: 100%;
    }

    .overflow {

        @include breakpoint(mobile) {
            position: fixed;
            top: calc(3 * $grid-cell-height + $main-margin);
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