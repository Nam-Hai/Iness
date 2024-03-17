<template>
    <div class="wrapper" ref="wrapperRef">
        <div class="image__wrapper noselect" @click="currentImage = N.mod(currentImage + 1, props.length)"
            :data-column="project.column" v-for="(project, index) in props" :class="{ active: index === currentImage }">
            <img :src="project.url" :alt="project.alt">
            <span>{{ index + 1 }} / {{ props.length }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onFlow, onLeave } from '~/waterflow/composables/onFlow';

const { props } = defineProps<{ props: ProjectImage[] }>()
const wrapperRef = ref() as Ref<HTMLElement>

const currentImage = ref(0)
onMounted(async () => {
    await nextTick()
    N.T(wrapperRef.value, 100, 0)
    useTL().from({
        el: wrapperRef.value,
        d: 1000,
        e: 'o5',
        delay: 100,
        p: {
            x: [100, 0]
        }
    }).play()
})
onLeave(() => {
    useTL().from({
        el: wrapperRef.value,
        d: 200,
        e: 'o2',
        p: {
            o: [1, 0]
        }
    }).play()
})
</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.wrapper {
    @include full();
    pointer-events: none;
}

.image__wrapper {
    pointer-events: all;
    position: absolute;
    margin: $main-margin;
    right: 0;
    top: 0;
    // width: calc($grid-cell-width * 4);
    // cursor: pointer;
    opacity: 0;
    height: calc(100% - $main-margin * 2);
    transition: opacity 200ms;
    cursor: e-resize;

    &.active {
        opacity: 1;
    }

    &[data-column="1"] {
        width: calc($grid-cell-width);
    }

    &[data-column="2"] {
        width: calc($grid-cell-width * 2);
    }

    &[data-column="3"] {
        width: calc($grid-cell-width * 3);
    }

    &[data-column="4"] {
        width: calc($grid-cell-width * 4);
    }

    img {
        width: 100%;
        max-height: calc(100% - 3rem);
        // height: calc($grid-cell-height * 2);
        margin-bottom: 1.6rem;

        max-width: 100%;

    }

    span {}
}
</style>
