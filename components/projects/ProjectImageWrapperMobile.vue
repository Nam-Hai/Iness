<template>
    <div class="wrapper " ref="wrapperRef" :class="{ 'cursor-resize': props.project_images_mobile.length > 1 }"
        @click="$event.stopPropagation(); currentImage = N.mod(currentImage + 1, props.project_images_mobile.length)">
        <div class="image__wrapper noselect" :data-column="project.column"
            v-for="(project, index) in props.project_images_mobile" :class="{ show: index === currentImageShow }"
            :key="project.image.id + '__' + index" v-leave>

            <div class="image">
                <ImgWrapper :props="project.image" :controller="project.controller" v-if="currentImageShow === index" />
            </div>
        </div>
    </div>

    <div class="project-info" v-if="breakpoint === 'mobile'">
        <NuxtLink to="/projects" class="back" v-streamed-text v-leave-text>Back to index</NuxtLink>

        <div class="info__wrapper">
            <span v-streamed-text v-leave-text v-if="props.title !== ''">{{ props.title }}</span>
            <span v-streamed-text v-leave-text v-if="props.client !== ''">{{ props.client }}</span>
            <span v-streamed-text v-leave-text v-if="props.type !== 'false'">{{ props.type }}</span>
            <span v-streamed-text v-leave-text v-if="props.date !== ''">{{ props.date }}</span>
        </div>
        <div class="description" v-streamed-text v-leave-text v-if="currentImageShow !== -1">
            {{ props.project_images_mobile[currentImage].description || "" }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { vStreamedText } from '~/directives/streamedText';
import { vLeave, vLeaveText } from '~/directives/leave'

const { props } = defineProps<{ props: ProjectData }>()
const wrapperRef = ref() as Ref<HTMLElement>
const { currentImage, currentImageDelay, currentImageShow } = useStoreProjectImage()
const { breakpoint } = useStoreView()
currentImage.value = 0
currentImageShow.value = 0

watch(currentImage, (to, from) => {
    const toI = props.project_images_mobile[to]
    const fromI = props.project_images_mobile[from]
    if (toI.description !== fromI.description) {
        currentImageShow.value = -1
    }
    currentImageDelay.value = -1
    useDelay(100, () => {
        currentImageDelay.value = to
        currentImageShow.value = to
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
    @include font-size;
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
    height: calc(2 * $grid-cell-height + $main-margin);

    .back {
        position: fixed;
        top: calc(2 * $grid-cell-height + $main-margin);
        left: $main-margin;
    }

    @include font-size;
    line-height: 1.6rem;

    .info__wrapper {
        @include breakpoint(mobile) {
            pointer-events: none;
        }

        margin-top: calc(3 * $grid-cell-height + $main-margin);
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
            // padding-bottom: calc($grid-cell-height + $main-margin);
        }

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

        &[data-column="3"] {
            width: calc($grid-cell-width * 3);
        }

        &[data-column="4"] {
            width: calc($grid-cell-width * 4);
        }

        &[data-column="7"] {
            width: calc($grid-cell-width * 7);
        }

        &[data-column="9"] {
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