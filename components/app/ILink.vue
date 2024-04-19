<template>
    <NuxtLink @click="toClipboard()" class="link__wrapper" :class="{ copied, font }" ref="wrapperRef" :to="href"
        :disable="copy" target="_blank" @mouseenter="trigger">
        <span v-streamed-text>
            {{ text }}
        </span>

        <span class="hover-text" ref="hoverTextRef">
            {{ copy ? copy : "Visit" }}
        </span>
    </NuxtLink>
</template>

<script lang="ts" setup>
import { vStreamedText } from '~/directives/streamedText';

const { href = "#", copy = "", text, font } = defineProps<{ href?: string, copy?: string, text: string, font: boolean }>()
const wrapperRef = ref() as Ref<HTMLElement>

const hoverTextRef = ref()
const { trigger } = useStreamingText(hoverTextRef)

const copied = ref(false)
let timer = useTimer(() => {
    copied.value = false
}, 900)

function toClipboard() {
    if (!copy) return
    copied.value = true
    navigator.clipboard.writeText(text);
    timer.tick()
}
</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.link__wrapper {
    pointer-events: auto;
    color: $primary;
    transition: color 250ms;
    cursor: pointer;
    width: fit-content;

    &.font {
        line-height: 1.5rem;
        font-size: 1.2rem;
    }

    &.copied {
        .hover-text {
            color: $primary;
            transition: color 250ms;
        }
    }

    .hover-text {
        pointer-events: none;
        color: $neutral-text;
        opacity: 0;
        position: absolute;
        left: 1rem;
        width: max-content;
    }

    &:hover {
        color: $discard-text;

        .hover-text {
            opacity: 1;
        }
    }
}
</style>
