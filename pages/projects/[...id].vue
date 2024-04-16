<template>
    <main ref="wrapperRef">
        <span class="back-index" v-if="breakpoint === 'desktop'" @click="navigateTo('/projects')" v-leave
            v-streamed-text2>
            Back to index
        </span>
        <ProjectsItemWrapper v-if="breakpoint == 'desktop'" />

        <ProjectImageWrapper :props="currentProject" v-if="breakpoint === 'desktop'" />
        <ProjectImageWrapperMobile :props="currentProject" v-else />

        <span class="counter" v-if="currentProject.project_images_mobile.length > 1 && breakpoint === 'mobile'">
            <span>{{ currentImage + 1 }}</span>/{{ currentProject.project_images_mobile.length }}
        </span>
    </main>
</template>


<script lang="ts" setup>
import { usePageFlow } from '~/waterflow/composables/usePageFlow';
import { defaultFlowIn, defaultFlowOut, flowInMap, flowOutMap } from '~/pages_transitions/default.transition';
import { useFlowProvider } from '~/waterflow/FlowProvider';
import { vLeave } from '~/directives/leave';
import { vStreamedText2 } from '~/directives/streamedText';

const { currentImage, currentImageShow } = useStoreProjectImage()

const wrapperRef = ref() as Ref<HTMLElement>

const { prismicData } = usePreloader()
const { breakpoint } = useStoreView()
const projects = prismicData.value.projects

const flowProvider = useFlowProvider()

const currentProject = projects.filter(el => {
    return "/projects/" + el.route === flowProvider.getRouteTo().fullPath
})[0]

usePageFlow({
    props: {
        wrapperRef,
    },
    flowOut: defaultFlowOut,
    flowInCrossfadeMap: flowInMap,
    enableCrossfade: 'TOP'
})
</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.back-index {
    position: fixed;
    top: calc($main-margin + $grid-cell-height);
    left: $main-margin;
    z-index: 200;
    cursor: pointer;
}

.counter {
    position: fixed;
    top: calc(3 * $grid-cell-height + $main-margin);
    left: $main-margin;
}

main {
    font-size: 1.2rem;
    line-height: 1.5rem;
    // position: relative;
    padding-top: $main-margin;
}


.filter-c__wrapper {
    position: absolute;
    left: calc($main-margin + var(--grid-column-width) * 5);
    top: $main-margin;
}
</style>
