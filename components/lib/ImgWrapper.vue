<template>
    <div class="img__wrapper" ref="wrapperRef" v-leave-img v-if="props.id !== '-1'">
        <img :src="props.url" :alt="props.name" onload="this.style.opacity = 1; this.style.backgroundColor = 'unset'" v-if="props.kind === 'image'"
            :style="{ 'aspect-ratio': (props.width! / props.height!) || 1 }">


        <div class="video__wrapper" v-else>
            <video disable-remote-playback="true" disableremoteplayback disablepictureinpicture
                disable-picture-in-picture="true" autoplay="true" playsinline="true" loop="true"
                onloadstart="this.style.opacity = 1;" :muted="!controller"
                :style="{ aspectRatio: props.height && props.width ? `${props.width} / ${props.height}` : '' }">
                <source :src="props.url">
            </video>

            <div class="controller__wrapper" v-if="controller">
                <button class="play__btn" @click="pause">
                    {{ isPaused ? "Pause" : "Play" }}
                </button>
                /
                <button class="mute__btn" @click="mute">
                    {{ isMuted ? "Unmute" : "Mute" }}
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { vLeave, vLeaveImg } from '~/directives/leave';

const { props, controller = true } = defineProps<{ props: PrismicMedia, controller: boolean }>()
const wrapperRef = ref() as Ref<HTMLElement>

const isPaused = ref(true)
const isMuted = ref(false)

function pause(e: Event) {
    e.stopPropagation()
    const video = wrapperRef.value.querySelector("video")
    if (!video) return
    isPaused.value = !isPaused.value
    isPaused.value ? video.play() : video.pause()
}
function mute(e: Event) {

    e.stopPropagation()
    const video = wrapperRef.value.querySelector("video")
    if (!video) return
    isMuted.value = !isMuted.value
    // isPaused.value ? video.play() : video.pause()
    video.volume = +!isMuted.value
    video.muted = isMuted.value

}
</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.img__wrapper {
    // background-color: $primary;
    position: relative;
    display: flex;


    display: flex;

    img,
    video {
        background-color: $discard-text;
        // height: 100%;
        width: 100%;
        opacity: 0;
        // transition: opacity 500ms;
        object-fit: cover;
        transition: opacity 100ms, background-color 100ms;
    }

    .video__wrapper {
        display: flex;
        position: relative;

        width: 100%;
        height: 100%;

        .controller__wrapper {
            display: flex;
            color: $primary;
            @include font-size;
            line-height: 1.6rem;
            position: absolute;
            bottom: -1.2rem - 1.6rem;
            right: 0;
            position: absolute;

            @include breakpoint(mobile) {
                position: fixed;

                top: calc(2 * $grid-cell-height + $main-margin);
                bottom: unset;
                right: $main-margin;
            }
        }

        button {
            margin-left: 0;
            margin-right: 0;
            padding-left: 0;
            padding-right: 0;
        }
    }
}
</style>
