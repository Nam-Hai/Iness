<template>
    <div class="filter__wrapper" ref="wrapperRef" @mouseenter="!isMobile && (filterOpen = true); filterHover(true)"
        @mouseleave="!isMobile && (filterOpen = false); filterHover(false)" :class="{ open: filterOpen }"
        v-if="breakpoint === 'desktop'">
        <button :style="{ cursor: 'default', color: '#AB0000' }" v-streamed-text="5" v-leave-text
            :class="{ open: filterOpen }" @click="filterOpen = !filterOpen" ref="filterRef">
            Filter +
        </button>

        <button @click="toggleFilterAll()" :class="{ active: toggledAll, hide: !filterOpen }" @mouseenter="()=> triggers[triggers.length -1].trigger()">
            All
            <span ref="allSpanRef" >
                {{ toggledAll ? "Unselect" : "Select" }}
            </span>
        </button>

        <button v-for="(filter, index) in prismicData.filters"
            :class="{ active: filterActive[filter], hide: !filterOpen }" @click="toggleFilter(filter, index)"
            ref="buttonRefs" @mouseenter="() => triggers[index].trigger()">
            {{ filter }}
            <span>
                {{ filterActive[filter] ? "Unselect" : "Select" }}
            </span>
        </button>
    </div>
    <FilterMobile v-else />
</template>

<script lang="ts" setup>
import { vStreamedText } from '~/directives/streamedText';
import { computeTimeline } from "~/composables/useStreamingText"
import { vLeaveText } from '~/directives/leave';

const wrapperRef = ref() as Ref<HTMLElement>

const { prismicData } = usePreloader()
const { isMobile } = useStore()
const { breakpoint } = useStoreView()
const { filterOpen, countFilter, filterActive, isEmpty } = useStoreFilter()

const filterRef = ref()
const allSpanRef = ref()
function filterHover(state: boolean) {
    const span = N.get("span:last-child", filterRef.value) as HTMLElement
    span.innerText = state ? "-" : "+"
}

const buttonRefs = ref() as Ref<HTMLElement[]>
const triggers: ({ trigger: () => void, compute: () => void })[] = []

useRO(({ breakpoint }) => {
    if (breakpoint === 'desktop') {
        computeCounter(countFilter.value, countFilter.value)
    }
})
onMounted(() => {
    if (buttonRefs.value) {
        for (const el of buttonRefs.value) {
            const span = N.get('span', el)!
            const { trigger, compute } = computeTimeline(span as HTMLElement)
            triggers.push({ trigger, compute })
        }
    }

    if (buttonRefs.value) {
        const { trigger, compute } = computeTimeline(allSpanRef.value)
        triggers.push({ trigger, compute })
    }
    console.log(triggers);


})

const toggledAll = ref(false)
async function toggleFilterAll() {
    for (const filter in filterActive) {
        filterActive[filter] = !toggledAll.value
    }

    toggledAll.value = !toggledAll.value

    let count = 0
    for (const [key, value] of Object.entries(filterActive)) {
        if (value) count++
    }
    countFilter.value = count
    await nextTick()
    for (const el of triggers) {
        el.compute()
    }
    triggers[triggers.length - 1].trigger()
}

async function toggleFilter(filter: string, index: number) {
    toggledAll.value = false
    filterActive[filter] = !filterActive[filter]
    if (filterActive[filter]) {
        countFilter.value++
    } else {
        countFilter.value--
    }
    await nextTick()
    triggers[index].compute()
    triggers[index].trigger()
}

function computeCounter(val: number, lastVal: number) {
    const spans = [...N.getAll("span", filterRef.value)] as HTMLElement[]
    if (spans.length === 0) {
        const text = filterRef.value.innerText
        filterRef.value.innerHTML = ""
        for (const c of text) {
            const span = N.Cr('span')
            spans.push(span)
            span.innerText = c
            filterRef.value.appendChild(span)
        }
    }
    const lastlastSpan = spans[spans.length - 2] as HTMLElement

    if (val !== 0 && (lastlastSpan.innerText[0] !== "(" && lastlastSpan.innerText[1] !== "(")) {
        const s = N.Cr('span')
        s.innerText = ` (${val}) `;
        lastlastSpan.insertAdjacentElement("afterend", s)
    } else if (lastVal !== 0 && val !== 0) {
        lastlastSpan.innerText = ` (${val}) `
    } else {
        if (lastlastSpan.innerText[0] === "(") {
            lastlastSpan.remove()
        }
    }
}
watch(countFilter, (val, lastVal) => {
    if (breakpoint.value !== 'desktop') return
    computeCounter(val, lastVal)
})
</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.filter__wrapper {
    font-weight: 500;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // row-gap: 3.6rem;
    // height: 2rem;
    height: $grid-cell-height;
    pointer-events: none;

    button:first-child {
        pointer-events: all;

    }

    &.open {
        pointer-events: all;

        button {
            pointer-events: all;
        }

        >span {
            &::before {
                transform: translate(50%, -50%) rotate(90deg);
            }
        }
    }

    >span {
        position: relative;
        width: fit-content;

        &::after,
        &::before {
            background-color: $primary;
            content: '';
            position: absolute;
            right: -1rem;
            top: 50%;
            transform: translate(50%, -50%);
            transition: transform 250ms $easeInOutQuart;
        }

        &:before {
            height: 0.8rem;
            width: 1px;
        }

        &::after {
            width: 0.8rem;
            height: 1px;
        }

    }

    &.open {
        // height: auto;
    }


    button {
        text-align: start;
        // text-transform: capitalize;

        // color: $discard-text;
        color: $primary;

        transition: opacity 200ms, color 200ms;

        >span {
            position: absolute;
            left: 1rem;
            top: 0.5rem;
            color: $neutral-text;
            pointer-events: none;
            opacity: 0;
            transition: opacity 200ms;
        }

        &.hide {
            pointer-events: none;
            opacity: 0;
        }

        &.active {
            // color: $primary;
            color: $neutral-text;
        }

        @media (hover:hover) and (pointer: fine) {
            &:hover {
                color: $discard-text;

                >span {
                    opacity: 1;
                }
            }
        }
    }
}
</style>
