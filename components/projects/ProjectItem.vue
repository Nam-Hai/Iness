<template>
    <div class="project__item__wrapper" ref="wrapperRef"
        :class="{ filterOpen: filterOpen, highlight: filterActive[props.type], empty: isEmpty }">
        <span>{{ props.title }}</span>
        <span>{{ props.client }}</span>
        <span>{{ props.type }}</span>
        <span>{{ props.date }}</span>

        <div class="project-preview">
            <img :src="props.preview_image.url" :alt="props.preview_image.alt" >
        </div>
    </div>

</template>

<script lang="ts" setup>
const { props } = defineProps<{ props: ProjectData }>()

const wrapperRef = ref() as Ref<HTMLElement>

const { filterOpen, filterActive, isEmpty } = useStoreFilter()

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.project__item__wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 0.3rem;
    text-transform: capitalize;
    transition: color 200ms, opacity 200ms;
    pointer-events: none;
    opacity: 0;

    cursor: pointer;

    &.empty,
    &.highlight {
        pointer-events: all;
        opacity: 1;
        color: $primary;

        &:hover {
            .project-preview {
                opacity: 1;
            }
        }
    }

    color: $discard-text;

    &.filterOpen {
        color: $discard-text;
        opacity: 1;

        &.highlight {
            color: $neutral-text;
        }
    }
}

.project-preview {
    position: fixed;
    right: $main-margin;
    top: $main-margin;

    opacity: 0;

    pointer-events: none;
    width: $grid-cell-width;
    img {
        width: 100%;
    }
}
</style>
