<template>
    <NuxtLink @click="toClipboard()" class="link__wrapper" ref="wrapperRef" :to="href" :disable="copy" target="_blank">
        <span v-streamed-text>
            {{ text }}
        </span>

        <span class="hover-text">
            {{ copy ? copy : "Visit" }}
        </span>
    </NuxtLink>
</template>

<script lang="ts" setup>
import { vStreamedText } from '~/directives/streamedText';

const { href = "#", copy = "", text } = defineProps<{ href?: string, copy?: string, text: string }>()
const wrapperRef = ref() as Ref<HTMLElement>

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
    color: $primary;
    transition: color 250ms;
    cursor: pointer;
    width: fit-content;

    .hover-text {
        pointer-events: none;
        color: $neutral-text;
        opacity: 0;
        position: absolute;
        left: 1rem;
        top: 0.5rem;
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
