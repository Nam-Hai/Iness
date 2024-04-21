<template>
    <div class="filter__wrapper" ref="wrapperRef" :class="{ open: filterOpen }">
        <div class="filter-modal" v-if="filterOpen" @click="filterOpen = false">
        </div>
        <button :style="{ cursor: 'pointer', color: '#AB0000' }" v-streamed-text="5" v-leave-text
            :class="{ open: filterOpen }" @click="filterOpen = !filterOpen" ref="filterRef">
            Filter +
        </button>

        <div class="filter-item__wrapper">
            <button @click="toggleFilterAll()" :class="{ active: toggledAll, hide: !filterOpen }">
                All
            </button>

            <button v-for="filter in prismicData.filters" :class="{ active: filterActive[filter], hide: !filterOpen }"
                @click="toggleFilter(filter)">
                {{ filter }}
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { vStreamedText } from '~/directives/streamedText';
import { vLeaveText } from '~/directives/leave';

const wrapperRef = ref() as Ref<HTMLElement>

const { prismicData } = usePreloader()
const { isMobile } = useStore()
const { breakpoint } = useStoreView()
const { filterOpen, countFilter, filterActive, isEmpty } = useStoreFilter()

const toggledAll = ref(false)
function toggleFilterAll() {
    for (const filter in filterActive) {
        filterActive[filter] = !toggledAll.value
    }

    toggledAll.value = !toggledAll.value
}

function toggleFilter(filter: string) {
    toggledAll.value = false
    filterActive[filter] = !filterActive[filter]

    if (filterActive[filter]) {
        countFilter.value++
    } else {
        countFilter.value--
    }
}


function filterHover(state: boolean) {
    const span = N.get("span:last-child", filterRef.value) as HTMLElement
    span.innerText = state ? "-" : "+"
}

watch(filterOpen, val => {
    filterHover(val)
})

useRO(({breakpoint}) => {
    if (breakpoint === 'mobile') {
        computeCounter(countFilter.value, countFilter.value)
    }
})
const filterRef = ref()
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
    if (breakpoint.value !== "mobile") return
    computeCounter(val, lastVal)
})

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.filter-modal {
    position: fixed;
    inset: 0;
    z-index: 1;
}

.filter__wrapper {
    font-weight: 500;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // row-gap: 3.6rem;
    // height: 2rem;
    height: $grid-cell-height;
    pointer-events: none;

    >button,
    >div {
        z-index: 2;
    }

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

    &.open {
        // height: auto;
    }


    .filter-item__wrapper {
        display: flex;
        position: fixed;
        top: calc($main-margin + $grid-cell-height);
        height: $grid-cell-height;
        justify-content: space-between;
        flex-direction: column;
        pointer-events: none;

        button {
            pointer-events: all;
        }
    }

    .filter-item__wrapper {
        button::after {
            content: "Select";
            position: absolute;
            left: 1rem;
            top: 0.5rem;
            color: $neutral-text;
            pointer-events: none;
            opacity: 0;
            transition: opacity 200ms;
        }
        button.active::after {
            content: "Unselect";
        }
    }

    button {
        text-align: start;
        // text-transform: capitalize;

        // color: $discard-text;
        color: $primary;

        transition: opacity 200ms, color 200ms;


        &:nth-child(1)::after {
            display: none;
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

                &::after {
                    opacity: 1;
                }

                &.active {
                    color: $neutral-text;

                    &::after {
                        opacity: 0;
                    }
                }
            }
        }
    }
}
</style>
