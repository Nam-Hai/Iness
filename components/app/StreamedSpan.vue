<template>
    <span class="streamed__wrapper" v-streamed-text v-leave-text>
        {{ text }}
    </span>
</template>

<script lang="ts" setup>
import { vStreamedText } from "~/directives/streamedText";
import { vLeaveText } from "~/directives/leave";
const { text } = defineProps<{ text: string }>()

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.streamed__wrapper {
    line-height: 1.5rem;
    font-size: 1.2rem;
}
</style>
