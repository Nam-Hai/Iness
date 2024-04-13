<template>
    <div class="lib-media" ref="wrapperRef">
        <img :src="props.url" :alt="props.name" v-if="props.kind === 'image'" />

        <video v-else-if="props.kind[0] === 'v'" playsinline disableremoteplayback="true" muted loop autoplay>
            <source :src="props.url">
        </video>
    </div>
</template>

<script lang="ts" setup>
export type PrismicMedia = {
    id: string,
    kind: string,
    name: string,
    size: string,
    url: string,
}
const { props } = defineProps<{ props: PrismicMedia }>()
// const emits = defineEmits([])

const store = useStore()

const wrapperRef = ref() as Ref<HTMLElement>

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.lib-media {}
</style>
