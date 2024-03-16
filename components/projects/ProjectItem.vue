<template>
    <div class="project__item__wrapper" ref="wrapperRef">
        <span>{{ props.title }}</span>
        <span>{{ props.client }}</span>
        <span>{{ props.type }}</span>
        <span>{{ props.date }}</span>
    </div>
</template>

<script lang="ts" setup>
const { props } = defineProps<{ props: Project }>()

const wrapperRef = ref() as Ref<HTMLElement>

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.project__item__wrapper {
    display: flex;
    flex-direction: column;

    row-gap: 0.3rem;
}
</style>
