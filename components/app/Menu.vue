<template>
    <div class="menu__wrapper" ref="wrapperRef" :class="{ filterOpen }">
        <NuxtLink to="/"
            :class="{ 'menu__active': routeRef.path === '/', hideMenu: delayedHideMenu && hideMenu, 'current-page': routeRef.name === 'index' }">
            <span ref="overviewRef" @mouseenter="overviewHoverTrigger"
                @touchstart="overviewHoverTrigger; addHoverTouch(overviewHoverRef)">
                Intro
            </span>
            <span class="hover-text" ref="overviewHoverRef">
                Enter
            </span>
        </NuxtLink>
        <NuxtLink to="/projects"
            :class="{ 'menu__active': routeRef.path === '/index', hideMenu: delayedHideMenu, 'current-page': routeRef.name === 'projects' || routeRef.name === 'projects-id' }">
            <span ref="indexRef"
                :style="{ display: routeRef.name === 'projects-id' && breakpoint === 'desktop' ? 'none' : 'unset' }"
                @mouseenter="indexHoverTrigger" @touchstart="indexHoverTrigger">
                Index
            </span>
            <span class="hover-text" ref="indexHoverRef">
                Enter
            </span>
        </NuxtLink>
        <NuxtLink to="/info" :class="{ hideMenu: delayedHideMenu, 'current-page': routeRef.name === 'info' }">
            <span ref="infoRef" @mouseenter="infoHoverTrigger" @touchstart="infoHoverTrigger">
                Info
            </span>
            <span class="hover-text" ref="infoHoverRef">
                Enter
            </span>
        </NuxtLink>
        <div :class="{ hideMenu: delayedHideMenu }" class="noselect shop">
            <div ref="shopRef" @mouseenter="() => !isMobile && shopHoverTrigger()"
                @touchstart="shopHoverTrigger(); addHoverTouch(shopRef)">
                Shop
            </div>

            <span class="hover-text" ref="shopHoverRef">
                Coming Soon
            </span>
        </div>

        <div @mouseenter="() => !isMobile && triggerWrapper()" @mouseleave="logoLeaveMouse">
            <img src="/Assets/logo-in.png" alt="logo-in">
        </div>
        <div @mouseenter="() => !isMobile && triggerWrapper()">
            <img src="/Assets/logo-e.png" alt="logo-e">
        </div>
        <div @mouseenter="() => !isMobile && triggerWrapper()">
            <img src="/Assets/logo-studio.png" alt="logo-studio">
        </div>

        <div class="hover-text" ref="hoverTextRef">
            {{ text }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Delay } from '~/plugins/core/raf';
import { useFlowProvider } from '~/waterflow/FlowProvider';

const wrapperRef = ref() as Ref<HTMLElement>

const { filterOpen } = useStoreFilter()

const overviewRef = ref()
const indexRef = ref()
const infoRef = ref()
const shopRef = ref()

const { isMobile } = useStore()
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

let isShow = false
const triggerWrapper = () => {
    if (!isShow) {
        trigger()
        N.Class.add(hoverTextRef.value, "hover-touch")
    }
    isShow = true
    delayShow.stop()
    delayHide.stop()
}
const logoLeaveMouse = () => {
    // N.Class.remove(hoverTextRef.value, "hover-touch")
    hoverTriggerLeave()
    isShow = false
    delayShow.run()
}
let delayShow: Delay;
let delayHide: Delay;
onMounted(() => {

    delayShow = useDelay(2000, () => {
        trigger()
        N.Class.add(hoverTextRef.value, "hover-touch")
        isShow = true
        delayHide.run()
    });
    delayHide = useDelay(6000, () => {
        // N.Class.remove(hoverTextRef.value, "hover-touch")
        hoverTriggerLeave()
        isShow = false
        delayShow.run()
    })
    delayHide.stop()
})

const { trigger, computeTimeline } = useStreamingText(hoverTextRef)
const { trigger: hoverTriggerLeave } = useLeaveText(hoverTextRef)

const { trigger: overviewTrigger } = useStreamingText(overviewRef)
const { trigger: indexTrigger } = useStreamingText(indexRef)
const { trigger: infoTrigger } = useStreamingText(infoRef)
const { trigger: shopTrigger } = useStreamingText(shopRef)
const { trigger: shopTriggerLeave } = useLeaveText(shopRef)
const { trigger: infoTriggerLeave } = useLeaveText(infoRef)
const { trigger: indexTriggerLeave } = useLeaveText(indexRef)
const { trigger: overviewTriggerLeave } = useLeaveText(overviewRef)
const shopHoverRef = ref()
const infoHoverRef = ref()
const overviewHoverRef = ref()
const indexHoverRef = ref()
const { trigger: shopHoverTrigger } = useStreamingText(shopHoverRef)
const { trigger: infoHoverTrigger } = useStreamingText(infoHoverRef)
const { trigger: overviewHoverTrigger } = useStreamingText(overviewHoverRef)
const { trigger: indexHoverTrigger } = useStreamingText(indexHoverRef)

onMounted(() => {

    if (routeRef.value.name === 'projects-id' && breakpoint.value === 'mobile') {
        shopTriggerLeave()
        infoTriggerLeave()
        indexTriggerLeave()
        overviewTriggerLeave()
    } else {
        overviewTrigger()
        indexTrigger()
        infoTrigger()
        shopTrigger()
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

function addHoverTouch(elRef: HTMLElement) {
    N.Class.add(elRef, "hover-touch")
    useDelay(2000, () => {
        elRef && N.Class.remove(elRef, "hover-touch")
    })
}
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

        >span {
            pointer-events: none;
        }

        pointer-events: none !important;

        @media (hover: hover) and (pointer: fine) {
            &:hover .hover-text {
                opacity: 0;
            }
        }
    }

    pointer-events: none;

    a:nth-child(1),
    a:nth-child(2),
    a:nth-child(3),
    div:nth-child(4) {
        transition: opacity 100ms;
        cursor: pointer;
        @include font-size;
        font-weight: 500;
        height: fit-content;
        width: fit-content;
        pointer-events: all;
        position: relative;

        @media (hover: hover) and (pointer: fine) {
            &:hover .hover-text {
                opacity: 1;
            }

            &:hover {
                color: $discard-text;
                transition: color 250ms;
            }
        }

        @media (pointer: coarse) {
            .hover-touch {
                color: $discard-text;
                transition: color 250ms;

                &~.hover-text {
                    opacity: 1;
                }
            }
        }

        .hover-text {
            color: $neutral-text;
            left: 0;
            bottom: 0;
            position: absolute;
            width: max-content;
            pointer-events: none;
            opacity: 0;
            transition: opacity 200ms;
        }

    }

    a:nth-child(1),
    a:nth-child(2),
    a:nth-child(3) {
        .hover-text {
            left: 1rem;
            bottom: 0.5rem;
        }
    }

    div:nth-child(4) {
        grid-column: 1 / 3;
        grid-row: 4/5;
    }

    a {

        pointer-events: all;
        @include font-size;
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

            @media (hover: hover) and (pointer: fine) {
                &:hover {
                    &~.hover-text {
                        opacity: 1;
                    }
                }
            }

            ~.hover-text.hover-touch {
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

            top: 0.38rem;

            img {
                width: 14px;
                height: 19.798px;
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
            top: 0.4rem;

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
        bottom: 1.75rem;
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
    // opacity: 0;
    pointer-events: none !important;
    // display: none !important;
}

img {
    object-fit: cover;
}
</style>
