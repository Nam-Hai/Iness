<template>
    <div class="lib-media" ref="wrapperRef" v-leave-img v-if="props.id !== '-1'">
        <img :src="props.url" :alt="props.name" v-if="props.kind === 'image'" />

        <video v-else-if="props.kind === 'video'" playsinline disableremoteplayback="true"
            disable-picture-in-picture="true" muted loop autoplay disablepictureinpicture
            :style="{ aspectRatio: props.height && props.width ? `${props.width} / ${props.height}` : '' }">
            <source :src="props.url">
        </video>
    </div>
</template>

<script lang="ts" setup>
import { vLeave, vLeaveImg } from '~/directives/leave';
const { props } = defineProps<{ props: PrismicMedia }>()
// const emits = defineEmits([])

const store = useStore()

const wrapperRef = ref() as Ref<HTMLElement>

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.lib-media {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: $discard-text;
    // pointer-events: all;

    img,
    video {
        width: 100%;
        height: 100%;

        object-fit: cover;
    }
}
</style>
