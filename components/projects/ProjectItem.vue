<template>
    <NuxtLink :to="/projects/ + props.route" class="project__item__wrapper" ref="wrapperRef" :class="{
        filterOpen: filterOpen, highlight: filterActive[props.type], empty: isEmpty, 'disable-route': disableRoute, 'scroll-out': !previewShow
    }" @click="onClick">
        <div class="container" ref="textRef" v-leave>
            <span v-streamed-text>{{ props.title }}</span>
            <span v-streamed-text>{{ props.client }}</span>
            <span v-streamed-text>{{ props.type }}</span>
            <span v-streamed-text>{{ props.date }}</span>

            <div class="description" v-if="routeTo.fullPath === '/projects/' + props.route && currentImageShow !== -1"
                v-streamed-text2>
                {{ props.project_images[currentImage]?.description || "" }}
            </div>
        </div>

        <div class="project-preview"
            :class="{ relative: routeTo.name === 'projects-id', 'scroll-show': previewShow, hide: routeTo.name === 'projects-id' && routeTo.fullPath === '/projects/' + props.route }">
            <img :src="props.project_images[0].url" :alt="props.project_images[0].alt" ref="imageRef" v-leave>
        </div>
    </NuxtLink>
</template>
<script lang="ts" setup>
import { vStreamedText, vStreamedText2 } from '~/directives/streamedText';
import { vLeave } from "~/directives/leave"
import { useFlowProvider } from '~/waterflow/FlowProvider';
import { onLeave } from '~/waterflow/composables/onFlow';

const { props } = defineProps<{ props: ProjectData }>()

const wrapperRef = ref() as Ref<HTMLElement>
const textRef = ref() as Ref<HTMLElement>

const { filterOpen, filterActive, isEmpty } = useStoreFilter()
const { breakpoint } = useStoreView()
const flowProvider = useFlowProvider()
const routeTo = flowProvider.getRouteTo()
const { currentImage, currentImageShow } = useStoreProjectImage()

const disableRoute = computed(() => {
    return routeTo.name === 'projects-id' && routeTo.fullPath !== '/projects/' + props.route
    // return false
})


const previewShow = onEnter({
    el: textRef,
    vStart: 20,
    vEnd: 5,
    both: true
})

const { placeholderPos, placeholderPosFrom } = useStoreProjectImage()
const imageRef = ref()

const click = ref(false)
function onClick() {
    click.value = true
}
onLeave(() => {

    const fromRoute = flowProvider.getRouteFrom()
    const routeTo = flowProvider.getRouteTo()
    if (routeTo.name === 'projects' || (routeTo.name === "projects-id" && breakpoint.value === "desktop")) {
        N.O(textRef.value, 0)
    }

    if (click.value === false) return
    if (fromRoute.name !== 'projects') return

    const domRect = imageRef.value.getBoundingClientRect()
    placeholderPosFrom.value = domRect
})

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

a {
    padding: 0;
    margin: 0;
}

.project__item__wrapper {
    display: block;
    // text-transform: capitalize;
    transition: color 200ms, opacity 200ms;
    pointer-events: none;
    opacity: 0;

    .container {
        display: flex;
        flex-direction: column;
        row-gap: 0.3rem;
        // text-transform: capitalize;
    }

    cursor: pointer;
    position: relative;

    &.empty,
    &.highlight {
        pointer-events: all;
        opacity: 1;
        color: $primary;

        &:hover {
            .project-preview {
                opacity: 1;
            }
        }
    }

    @include breakpoint(mobile) {
        &.scroll-out {
            pointer-events: none;
            color: $neutral-text;
        }
    }

    &.disable-route {
        color: $discard-text;
        height: 100%;
    }


    color: $discard-text;

    &.filterOpen {
        color: $discard-text;
        opacity: 1;

        &.highlight {
            color: $neutral-text;
        }
    }
}

.project-preview {
    position: fixed;
    right: $main-margin;
    top: $main-margin;

    opacity: 0;

    pointer-events: none;
    width: var(--grid-column-width);

    transition: opacity 200ms;

    @include breakpoint(mobile) {
        width: calc($grid-cell-width * 2);
        left: calc($grid-cell-width * 2 + $main-margin);

        &.scroll-show {
            opacity: 1;
        }
    }


    &.relative {
        position: absolute;
        top: 0;
        left: 0;
    }

    &.hide {
        opacity: 0 !important;
    }

    img {
        width: 100%;
    }
}
</style>
