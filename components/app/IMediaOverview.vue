<template>
    <div class="lib-media" ref="wrapperRef" v-leave-img>
        <div class="container">

            <img :src="props.url" :alt="props.name" v-if="props.kind === 'image'" />

            <video v-else-if="props.kind === 'video'" playsinline disableremoteplayback="true"
                disable-picture-in-picture="true" muted loop autoplay
                :style="{ aspectRatio: props.height && props.width ? 'props.width / props.height' : '' }">
                <source :src="props.url">
            </video>
        </div>
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

    .container {
        display: flex;

        @include breakpoint(mobile) {
            height: 100%;
        }

        @include breakpoint(desktop) {
            width: 100%;
        }

        background-color: $discard-text;
    }

    @include breakpoint(mobile) {
        display: flex;
        justify-content: flex-end;
    }

    img,
    video {
        @include breakpoint(mobile) {
            height: 100%;
        }

        @include breakpoint(desktop) {
            width: 100%;
        }

        object-fit: cover;
    }
}
</style>
