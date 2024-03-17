<template>
    <NuxtLink :to="/projects/ + props.route" class="project__item__wrapper" ref="wrapperRef" :class="{
        filterOpen: filterOpen, highlight: filterActive[props.type], empty: isEmpty, 'disable-route': disableRoute
    }">
        <div class="container" ref="textRef">
            <span>{{ props.title }}</span>
            <span>{{ props.client }}</span>
            <span>{{ props.type }}</span>
            <span>{{ props.date }}</span>
        </div>

        <div class="project-preview"
            :class="{ relative: routeTo.name === 'projects-id', hide: routeTo.name === 'projects-id' && routeTo.fullPath === '/projects/' + props.route }">
            <img :src="props.project_images[0].url" :alt="props.project_images[0].alt">
        </div>
    </NuxtLink>

</template>
<script lang="ts" setup>
import { useFlowProvider } from '~/waterflow/FlowProvider';
import { onLeave } from '~/waterflow/composables/onFlow';

const { props } = defineProps<{ props: ProjectData }>()

const wrapperRef = ref() as Ref<HTMLElement>
const textRef = ref() as Ref<HTMLElement>

const { filterOpen, filterActive, isEmpty } = useStoreFilter()
const flowProvider = useFlowProvider()
const routeTo = flowProvider.getRouteTo()

const disableRoute = computed(() => {
    return routeTo.name === 'projects-id' && routeTo.fullPath !== '/projects/' + props.route
})

onLeave(() => {
    N.O(textRef.value, 0)
})
</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.project__item__wrapper {
    display: block;
    text-transform: capitalize;
    transition: color 200ms, opacity 200ms;
    pointer-events: none;
    opacity: 0;

    .container {
        display: flex;
        flex-direction: column;
        row-gap: 0.3rem;
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

    &.disable-route {
        color: $discard-text;
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
    width: $grid-cell-width;

    transition: opacity 200ms;


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
