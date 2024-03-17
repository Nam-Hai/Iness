<template>
    <div class="projects-item__wrapper" ref="wrapperRef">
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
    </div>
</template>

<script lang="ts" setup>

const { prismicData } = usePreloader()
const projects = prismicData.value.projects

const store = useStore()

const wrapperRef = ref() as Ref<HTMLElement>

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.projects-item__wrapper {}

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
</style>
