<template>
    <span class="streamed__wrapper" v-streamed-text>
        {{ text }}
    </span>
</template>

<script lang="ts" setup>
import { vStreamedText } from "~/directives/streamedText";
const { text } = defineProps<{ text: string }>()

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.streamed__wrapper {}
</style>
