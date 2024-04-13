<template>
    <main ref="wrapperRef">
        <ProjectsItemWrapper v-if="breakpoint == 'desktop'" />

        <ProjectImageWrapper :props="currentProject" />
    </main>
</template>

<script lang="ts" setup>
import { usePageFlow } from '~/waterflow/composables/usePageFlow';
import { defaultFlowIn, defaultFlowOut, flowInMap, flowOutMap } from '~/pages_transitions/default.transition';
import { useFlowProvider } from '~/waterflow/FlowProvider';

const wrapperRef = ref() as Ref<HTMLElement>

const { prismicData } = usePreloader()
const { breakpoint } = useStoreView()
const projects = prismicData.value.projects

const { resetFilter } = useStoreFilter()
resetFilter()

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

main {
    line-height: 100%;
    // position: relative;
    padding-top: $main-margin;

}


.filter-c__wrapper {
    position: absolute;
    left: calc($main-margin + var(--grid-column-width) * 5);
    top: $main-margin;
}
</style>
