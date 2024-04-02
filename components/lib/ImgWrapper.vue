<template>
    <div class="img__wrapper" ref="wrapperRef">
        <!-- <img :src="props.src" :alt="props.alt" onload="this.style.opacity = 1"
            :style="{ aspectRatio: props.width / props.height }" v-leave v-if="props.src === 'mp4'"> -->


        <div class="video__wrapper">
            <video disable-remote-playback="true" disable-picture-in-picture="true" autoplay="true" playsinline="true"
                loop="true" src="/la_feve_trim.mp4" onloadstart="this.style.opacity = 1;">
            </video>

            <div class="controller__wrapper">
                <button class="play__btn" @click="pause">
                    {{ isPaused ? "Play" : "Pause" }}
                </button>
                /
                <button class="mute__btn" @click="mute">
                    {{ isMuted ? "Unmute" : "Mute" }}
                </button>
            </div>

        </div>
        <!-- <video disableremoteplayback="true"
            src="https://res.cloudinary.com/mkpill/video/upload/v1691655828/makepill_showreel_opti_a5c666148b.mp4"
            autoplay="" playsinline="" muted="muted" loop="" data-v-970f869d=""
            style="translate: none; rotate: none; scale: none; transform: scale(1.2, 1.2);"></video> -->
    </div>
</template>

<script lang="ts" setup>
import { vLeave } from '~/directives/leave';

const { props } = defineProps<{ props: { src: string, alt: string, height: number, width: number } }>()

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

}
</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.img__wrapper {
    background-color: $primary;
    position: relative;
    display: flex;

    img,
    video {
        height: 100%;
        width: 100%;
        opacity: 0;
        // transition: opacity 500ms;
        object-fit: cover;
    }

    .video__wrapper {
        .controller__wrapper {
            display: flex;
            color: $primary;
            font-size: 12px;
            position: absolute;
            bottom: -2.8rem;
            right: 0;
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
