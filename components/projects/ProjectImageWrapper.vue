<template>
    <div class="image__wrapper noselect" ref="wrapperRef" @click="currentImage = N.mod(currentImage + 1, props.length)"
        :data-column="project.column" v-for="(project, index) in props"
        :class="{ active: index === currentImage }">
        <img :src="project.url" :alt="project.alt">
        <span>{{ index + 1 }} / {{ props.length }}</span>
    </div>
</template>

<script lang="ts" setup>
const { props } = defineProps<{ props: ProjectImage[] }>()
const wrapperRef = ref() as Ref<HTMLElement>

const currentImage = ref(0)
</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.image__wrapper {
    position: absolute;
    margin: $main-margin;
    right: 0;
    top: 0;
    // width: calc($grid-cell-width * 4);
    cursor: pointer;
    opacity: 0;

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
        // height: calc($grid-cell-height * 2);
        margin-bottom: 1.6rem;

        max-width: 100%;

    }

    span {}
}
</style>
