<template>
    <main ref="wrapperRef">
        <ProjectsItemWrapper />

        <div class="filter-c__wrapper">
            <Filter />
        </div>
    </main>
</template>

<script lang="ts" setup>
import { usePageFlow } from '~/waterflow/composables/usePageFlow';
import { defaultFlowIn, defaultFlowOut } from '~/pages_transitions/default.transition';

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
}


.filter-c__wrapper {
    position: fixed;
    left: calc($main-margin + var(--grid-column-width) * 5 + var(--grid-column-gap) * 5);
    top: $main-margin;

    pointer-events: none;

    @include breakpoint(mobile) {
        left: calc($grid-cell-width * 5 + $main-margin); 
    }
}
</style>
