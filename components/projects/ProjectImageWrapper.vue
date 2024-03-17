<template>
    <div class="image__wrapper" ref="wrapperRef">
        <img :src="props[0].url" alt="test">
        <span>1 / 3</span>
    </div>
</template>

<script lang="ts" setup>
const { props } = defineProps<{ props: ProjectImage[] }>()
const wrapperRef = ref() as Ref<HTMLElement>

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.image__wrapper {
    position: absolute;
    padding: $main-margin;
    right: 0;
    top: 0;
    width: 40rem;

    img {
        width: 100%;
        margin-bottom: 1.6rem;
    }

    span {}
}
</style>
