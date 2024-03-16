<template>
    <main ref="wrapperRef">

        <div class="menu__project__wrapper">
            <div class="project__wrapper">
                <ProjectItem :props="projects[0]" />
            </div>
        </div>
        <div class="projects__wrapper">
            <div class="project__wrapper" v-for="project in projects">
                <ProjectItem :props="project" />
            </div>
        </div>


        <div class="filter-c__wrapper">
            <Filter />
        </div>
    </main>
</template>

<script lang="ts" setup>
import { usePageFlow } from '~/waterflow/composables/usePageFlow';
import { defaultFlowIn, defaultFlowOut } from '~/pages_transitions/default.transition';

const { prismicData } = usePreloader()
const projects = prismicData.value.projects
const { } = useStoreProject()

const wrapperRef = ref() as Ref<HTMLElement>

usePageFlow({
    props: {
        wrapperRef,
    },
    flowOut: defaultFlowOut,
    flowInCrossfade: defaultFlowIn,
    enableCrossfade: 'TOP'
})
</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

main {
    line-height: 100%;
    // position: relative;
    padding-top: $main-margin;
}

.menu__project__wrapper {
    position: absolute;
    top: calc($grid-cell-height + $main-margin);
    left: $main-margin;

    .project__wrapper {
        height: $grid-cell-height;
        width: $grid-cell-width;
    }
}

.projects__wrapper {
    display: grid;

    height: calc(var(--100vh) - #{$main-margin * 2});
    width: 100%;

    margin-left: calc($main-margin + var(--grid-column-width));
    grid-template-columns: repeat(3, var(--grid-column-width));
    grid-template-rows: repeat(4, 1fr);
    grid-column-gap: var(--grid-column-gap);

    grid-auto-flow: row;

    .project__wrapper {
        height: $grid-cell-height;
    }
}

.filter-c__wrapper {
    position: absolute;
    left: calc($main-margin + var(--grid-column-width) * 5);
    top: $main-margin;
}

#project-preview {
    position: absolute;
    right: $main-margin;
    top: $main-margin;
}
</style>
