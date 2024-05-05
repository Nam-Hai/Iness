<template>
    <main ref="wrapperRef">
        <span class="back-index" v-if="breakpoint === 'desktop'" @click="navigateTo('/projects')" v-leave-text
            v-streamed-text-2>
            Back to index
        </span>
        <ProjectsItemWrapper v-if="breakpoint == 'desktop'" />

        <ProjectImageWrapper :props="currentProject" v-if="breakpoint === 'desktop'" />
        <ProjectImageWrapperMobile :props="currentProject" v-else />

        <span class="counter"
            v-if="currentImageDelay !== -1 && currentProject.project_images_mobile.length > 1 && breakpoint === 'mobile'"
            v-streamed-text v-leave-text>
            <span>{{ currentImage + 1 }}</span><span>/</span><span>{{ currentProject.project_images_mobile.length
                }}</span>
        </span>
        <span class="next" v-if="currentProject.project_images_mobile.length > 1 && breakpoint === 'mobile'"
            v-streamed-text v-leave-text
            @click="$event.stopPropagation(); currentImage = N.mod(currentImage + 1, currentProject.project_images.length)">
            <span>
                Next image
            </span>
        </span>
    </main>
</template>


<script lang="ts" setup>
import { usePageFlow } from '~/waterflow/composables/usePageFlow';
import { defaultFlowIn, defaultFlowOut, flowInMap, flowOutMap } from '~/pages_transitions/default.transition';
import { useFlowProvider } from '~/waterflow/FlowProvider';
import { vLeave, vLeaveText } from '~/directives/leave';
import { vStreamedText, vStreamedText2 } from '~/directives/streamedText';

const { currentImage, currentImageDelay, currentImageShow } = useStoreProjectImage()

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
    flowOutMap: flowOutMap,
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

.next {
    position: fixed;
    top: calc(3 * $grid-cell-height + $main-margin);
    left: calc($main-margin + $grid-cell-width * 2);

}

main {
    font-size: 1.2rem;
    line-height: 1.6rem;
    // position: relative;
    // min-height: 100vh;
}


.filter-c__wrapper {
    position: absolute;
    left: calc($main-margin + var(--grid-column-width) * 5);
    top: $main-margin;
}
</style>
