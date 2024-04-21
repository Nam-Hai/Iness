<template>
    <div class="projects-item__wrapper" v-if="breakpoint == 'desktop'" :class="{ overflow: false }">
        <div class="menu__project__wrapper">
            <div class="project__wrapper">
                <ProjectItem :props="prismicData.projects[0]" />
            </div>
        </div>
        <div class="projects__wrapper">
            <div class="project__wrapper"
                v-for="project, index in prismicData.projects.slice(1)"
                :class="{ gridFlow: index > 12 }">
                <ProjectItem :props="project" />
            </div>
        </div>
    </div>

    <div class="projects-item__wrapper projects-item__wrapper-mobile" ref="mobileProjectItemRef" v-else>
        <div class="projects__wrapper projects__wrapper-mobile">
            <div class="project__wrapper" v-for="project in prismicData.projects">
                <ProjectItem :props="project" />
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>

const { prismicData } = usePreloader()


const { breakpoint } = useStoreView()

const mobileProjectItemRef = ref() as Ref<HTMLElement>

const { mobileShow } = useStoreProjectImage()
mobileShow.value = true
const enter = onEnter({
    el: mobileProjectItemRef,
    vStart: -10,
    enterCb: () => {
    },
})

watch(enter, val => {
    mobileShow.value = !val
})

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.projects-item__wrapper {}

.menu__project__wrapper {
    position: fixed;
    top: calc($grid-cell-height + $main-margin);
    left: $main-margin;


    .project__wrapper {
        height: $grid-cell-height;
        width: $grid-cell-width;
    }
}

.projects__wrapper {
    display: grid;

    // height: calc(var(--100vh) - #{$main-margin * 2});
    // height: 100vh;
    width: 100%;

    padding-left: calc($main-margin + var(--grid-column-width) + var(--grid-column-gap));

    grid-column-gap: var(--grid-column-gap);
    grid-template-columns: repeat(3, var(--grid-column-width));
    // grid-template-rows: repeat(4, 1fr);

    grid-auto-flow: row;
    padding-top: $main-margin;

    &-mobile {
        margin-left: 0;
        position: absolute;
        display: flex;
        flex-direction: column;
        // height: $grid-cell-height;
        width: calc(4 * $grid-cell-width);
        right: $main-margin;
        padding-top: calc($grid-cell-height + $main-margin);

        min-height: 100vh;
        height: unset;

        .project__wrapper {
            height: $grid-cell-height;


        }
    }

    .project__wrapper {
        height: $grid-cell-height;

        &:last-child {
            @include breakpoint(mobile) {
                padding-bottom: calc(var(--100vh) - $main-margin);
            }
        }
    }

}

.projects-item__wrapper-mobile {
    min-height: 100vh;
}
</style>
