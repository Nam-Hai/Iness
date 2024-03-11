<template>
    <div class="img__wrapper" ref="wrapperRef" :style="{ height: props.height, width: props.width }">
        <img :src="props.src" :alt="props.alt" onload="this.style.opacity = 1">
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ src: string, alt: string, height: string, width: string }>()
console.log(props);

const wrapperRef = ref() as Ref<HTMLElement>

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.img__wrapper {
    background-color: $primary;
    position: relative;

    img {
        height: 100%;
        width: 100%;
        opacity: 0;
        transition: opacity 500ms;
        object-fit: cover;
    }
}
</style>
