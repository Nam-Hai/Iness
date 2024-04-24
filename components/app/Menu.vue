<template>
    <div class="menu__wrapper" ref="wrapperRef" :class="{ filterOpen }">
        <NuxtLink to="/"
            :class="{ 'menu__active': routeRef.path === '/', hideMenu: delayedHideMenu && hideMenu, 'current-page': routeRef.name === 'index' }">
            <span ref="overviewRef">
                Overview
            </span>
        </NuxtLink>
        <NuxtLink to="/projects"
            :class="{ 'menu__active': routeRef.path === '/index', hideMenu: delayedHideMenu, 'current-page': routeRef.name === 'projects' || routeRef.name === 'projects-id' }">
            <span ref="indexRef"
                :style="{ display: routeRef.name === 'projects-id' && breakpoint === 'desktop' ? 'none' : 'unset' }">
                Index
            </span>
        </NuxtLink>
        <NuxtLink to="/info" :class="{ hideMenu: delayedHideMenu, 'current-page': routeRef.name === 'info' }">
            <span ref="infoRef">
                Info
            </span>
        </NuxtLink>
        <div :class="{ hideMenu: delayedHideMenu }" class="noselect shop">
            <div ref="shopRef" @mouseenter="shopHoverTrigger" @touchstart="shopHoverTrigger">
                Shop
            </div>

            <span class="hover-text" ref="shopHoverRef">
                Coming Soon
            </span>
        </div>

        <div @mouseenter="trigger" @touchstart="trigger">
            <img src="/Assets/logo-in.png" alt="logo-in">
        </div>
        <div @mouseenter="trigger" @touchstart="trigger">
            <img src="/Assets/logo-e.png" alt="logo-e">
        </div>
        <div @mouseenter="trigger" @touchstart="trigger">
            <img src="/Assets/logo-studio.png" alt="logo-studio">
        </div>

        <div class="hover-text" ref="hoverTextRef">
            {{ text }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useFlowProvider } from '~/waterflow/FlowProvider';

const wrapperRef = ref() as Ref<HTMLElement>

const { filterOpen } = useStoreFilter()

const overviewRef = ref()
const indexRef = ref()
const infoRef = ref()
const shopRef = ref()

const { breakpoint } = useStoreView()

const { routeRef } = useFlowProvider()
const { prismicData, preloaderComplete } = usePreloader()
const text = ref("")
watch([breakpoint, preloaderComplete], async () => {
    if (!prismicData.value) return
    if (!prismicData.value.bottomText) return
    const bottomText = prismicData.value.bottomText
    text.value = breakpoint.value === "desktop" ? bottomText.desktop : bottomText.mobile
    await nextTick()
    computeTimeline()
}, { immediate: true })

const delayedHideMenu = ref(false)

const hideMenu = ref(false)
watch([routeRef, breakpoint], () => {
    const hide = breakpoint.value === 'mobile' && routeRef.value.name === 'projects-id'

    useDelay(routeRef.value.name === 'projects-id' && breakpoint.value === 'mobile' ? 600 : 0, () => {
        delayedHideMenu.value = hide
    })
    hideMenu.value = hide
}, { immediate: true })

const hoverTextRef = ref() as Ref<HTMLElement>
const { trigger, computeTimeline } = useStreamingText(hoverTextRef)

const { trigger: overviewTrigger } = useStreamingText(overviewRef)
const { trigger: indexTrigger } = useStreamingText(indexRef)
const { trigger: infoTrigger } = useStreamingText(infoRef)
const { trigger: shopTrigger } = useStreamingText(shopRef)
const { trigger: shopTriggerLeave } = useLeaveText(shopRef)
const { trigger: infoTriggerLeave } = useLeaveText(infoRef)
const { trigger: indexTriggerLeave } = useLeaveText(indexRef)
const { trigger: overviewTriggerLeave } = useLeaveText(overviewRef)
const shopHoverRef = ref()
const { trigger: shopHoverTrigger } = useStreamingText(shopHoverRef)

onMounted(() => {
    overviewTrigger()
    indexTrigger()
    infoTrigger()
    shopTrigger()

    if (routeRef.value.name === 'projects-id' && breakpoint.value === 'mobile') {
        shopTriggerLeave()
        infoTriggerLeave()
        indexTriggerLeave()
        overviewTriggerLeave()
    }
})

watch(routeRef, (routeTo, routeFrom) => {
    const check = routeFrom.name === "projects-id" && routeTo.name !== "projects-id" && breakpoint.value === "mobile"
    if (check) {
        overviewTrigger()
        indexTrigger()
        infoTrigger()
        shopTrigger()
    }
    else if (routeTo.name === "projects-id" && routeFrom.name !== "projects-id" && breakpoint.value === 'mobile') {
        shopTriggerLeave()
        infoTriggerLeave()
        indexTriggerLeave()
        overviewTriggerLeave()
    }
})

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.menu__wrapper {
    position: fixed;
    left: 50%;
    top: 0;
    transform: translate(-50%);
    z-index: $z-menu;
    line-height: 1.6rem;

    @include mainGrid();

    color: $primary;

    &.filterOpen {
        color: $neutral-text;
    }

    .current-page {
        color: $neutral-text;
    }

    pointer-events: none;

    div:nth-child(1),
    div:nth-child(2),
    div:nth-child(3),
    div:nth-child(4) {
        transition: opacity 100ms;
    }

    div:nth-child(4) {
        grid-column: 1 / 3;
        grid-row: 4/5;
        cursor: pointer;
        font-size: 1.2rem;
        font-weight: 500;
        height: fit-content;
        width: fit-content;
        pointer-events: all;
        position: relative;

        .hover-text {
            color: $neutral-text;
            left: 0;
            bottom: 0;
            position: absolute;
            width: max-content;
            pointer-events: none;
            font-size: 100%;
            opacity: 0;
        }

        &:hover .hover-text {
            opacity: 1;
        }

        // &::after {
        //     position: absolute;
        //     content: "Coming soon";
        //     left: 0;
        //     top: 0;
        //     color: $neutral-text;
        //     opacity: 0;
        //     transition: opacity 250ms;
        //     width: max-content;
        // }

        &:hover {
            color: $discard-text;
            transition: color 250ms;

            &::after {
                opacity: 1;
            }

        }
    }

    a {

        pointer-events: all;
        font-size: 1.2rem;
        font-weight: 500;
        height: fit-content;
        width: fit-content;
        position: relative;

        &:nth-child(1) {
            grid-column: 1 / 3;
            grid-row: 1/2;
        }

        &:nth-child(2) {
            grid-column: 1 / 3;
            grid-row: 2/3;
        }

        &:nth-child(3) {
            grid-column: 1 / 3;
            grid-row: 3/4;
        }




        &.menu__active {
            font-weight: 600;
            // color: yellow;
        }
    }

    >div {

        &:nth-child(5),
        &:nth-child(7),
        &:nth-child(6) {
            position: relative;
            pointer-events: all;
            cursor: pointer;
            width: fit-content;

            &:hover {
                &~.hover-text {
                    opacity: 1;
                }
            }
        }

        &:hover {

            // color: $discard-text;
            // transition: color 250ms;
            &::after {
                opacity: 1;
            }
        }

        &:nth-child(5) {
            grid-column: 1 / 9;
            grid-row: 4 / 5;
            align-self: end;
            font-size: 2.6rem;

            max-width: 10rem;
            position: relative;

            &::after {
                content: "";
                height: 3rem;
                width: calc($grid-cell-width * 6);
                display: block;
                position: fixed;
                bottom: 1.2rem;
                z-index: 2;
            }


            img {
                width: 1.9388rem;
                height: 1.8927rem;
                flex-shrink: 0;
            }

        }

        &:nth-child(6) {
            grid-column: 3 / 4;
            grid-row: 4 / 5;
            align-self: end;

            top: 0.3rem;

            img {
                width: 14.792px;
                height: 21.498px;
                object-fit: unset;
            }

            @include breakpoint(mobile) {
                img {
                    width: 13.792px;
                    height: 20.498px;
                }
            }
        }

        &:nth-child(7) {
            grid-column: 6 / 9;
            grid-row: 4 / 5;
            align-self: end;
            top: 0.28rem;

            img {
                width: 74.731px;
                height: 19.999px;
            }
        }
    }

    >.hover-text {
        pointer-events: none;
        opacity: 0;
        color: $neutral-text;
        // left: 1.9rem;
        bottom: 1.9rem;
        position: fixed;
        width: max-content;
        font-size: 2.6rem;
        z-index: -1;
    }
}

.shop {
    position: relative;
    z-index: 200;
    pointer-events: all;
}

.hideMenu {
    // display: none !important;
}

img {
    object-fit: cover;
}
</style>
