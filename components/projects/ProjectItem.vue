<template>
    <NuxtLink :to="routeTo.path === '/projects/' + props.route ? '/projects' : /projects/ + props.route"
        class="project__item__wrapper" ref="wrapperRef" :class="{
            filterOpen: filterOpen, highlight: filterActive[props.type], empty: isEmpty, 'disable-route': disableRoute, 'scroll-out': !previewShow, 'mobileShow': mobileShow && breakpoint === 'mobile',
        }" @click="onClick">
        <div class="container" ref="textRef">
            <span v-streamed-text-project v-leave-text-project-item v-if="props.title !== ''">{{ props.title }}</span>
            <span v-streamed-text-project v-leave-text-project-item v-if="props.client !== ''">{{ props.client }}</span>
            <span v-streamed-text-project v-leave-text-project-item v-if="props.type !== 'false'">{{ props.type }}</span>
            <span v-streamed-text-project v-leave-text-project-item v-if="props.date !== ''">{{ props.date }}</span>

            <div class="description" v-if="routeTo.fullPath === '/projects/' + props.route && currentImageShow !== -1"
                v-streamed-text-project v-leave-text-project-item>
                {{ props.project_images[currentImage]?.description || "" }}
            </div>
        </div>

        <div class="project-preview" v-if="routeTo.name !== 'projects-id'"
            :class="{ 'scroll-show': previewShow, hide: routeTo.name === 'projects-id' && routeTo.fullPath === '/projects/' + props.route }"
            @click="navigateTo('/projects/' + props.route)">
            <IMedia :props="props.cover" v-if="breakpoint === 'desktop'">
            </IMedia>
            <IMedia :props="props.cover_mobile" v-else></IMedia>
        </div>
    </NuxtLink>
</template>
<script lang="ts" setup>
import { vStreamedText, vStreamedText2, vStreamedTextProject } from '~/directives/streamedText';
import { vLeave, vLeaveText, vLeaveTextProjectItem } from "~/directives/leave"
import { useFlowProvider } from '~/waterflow/FlowProvider';
import { onLeave } from '~/waterflow/composables/onFlow';

const { props } = defineProps<{ props: ProjectData }>()

const wrapperRef = ref() as Ref<HTMLElement>
const textRef = ref() as Ref<HTMLElement>

const { filterOpen, filterActive, isEmpty } = useStoreFilter()
const { breakpoint } = useStoreView()
const flowProvider = useFlowProvider()
const routeTo = flowProvider.getRouteTo()
const { currentImage, currentImageShow, mobileShow } = useStoreProjectImage()

const disableRoute = computed(() => {
    return routeTo.name === 'projects-id' && routeTo.fullPath !== '/projects/' + props.route
})

const previewShow = onEnter({
    el: textRef,
    vStart: 20,
    vEnd: 5,
    both: true
})

const click = ref(false)
function onClick(e: Event) {
    e.stopPropagation()
    click.value = true
}
onLeave(() => {

    const fromRoute = flowProvider.getRouteFrom()
    const routeTo = flowProvider.getRouteTo()
    if (routeTo.name === 'projects' || (routeTo.name === "projects-id" && breakpoint.value === "desktop")) {
        textRef.value.style.opacity = "0!important"
    }

    if (click.value === false) return
    if (fromRoute.name !== 'projects') return
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

    padding: 0.4rem;
    margin-left: -0.4rem;
    margin-top: -0.4rem;
    line-height: 1.6rem;
    font-size: 1.2rem;


    @include breakpoint(mobile) {
        line-height: 1.6rem;
        font-size: 1.2rem;
    }

    .container {
        display: flex;
        flex-direction: column;
        // text-transform: capitalize;
    }

    cursor: pointer;
    position: relative;

    &.mobileShow {
        color: $primary !important;

        &.filterOpen {
            color: $discard-text !important;
            opacity: 1;

            &.highlight {
                color: $neutral-text !important;
            }
        }
    }

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
            // pointer-events: none;
            color: $neutral-text;
        }
    }

    &.disable-route {
        color: $discard-text;
        height: 100%;

        &:hover {
            color: $neutral-text;
        }
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
            pointer-events: all;
            opacity: 1;
        }
    }


    &.hide {
        opacity: 0 !important;
    }

    img {
        width: 100%;
    }
}
</style>
