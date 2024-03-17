<template>
    <main ref="wrapperRef">
        <ProjectsItemWrapper />

        <div class="fade-id">
            <ProjectImageWrapper :props="currentProject.project_images" />
        </div>
    </main>
</template>

<script lang="ts" setup>
import { usePageFlow } from '~/waterflow/composables/usePageFlow';
import { defaultFlowIn, defaultFlowOut } from '~/pages_transitions/default.transition';
import { useFlowProvider } from '~/waterflow/FlowProvider';

const wrapperRef = ref() as Ref<HTMLElement>

const { prismicData } = usePreloader()
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

.fade-id {
    animation: fade-id linear 200ms forwards;
}



@keyframes fade-id {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.filter-c__wrapper {
    position: absolute;
    left: calc($main-margin + var(--grid-column-width) * 5);
    top: $main-margin;
}
</style>
