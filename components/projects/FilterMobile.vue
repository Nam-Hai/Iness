<template>
    <div class="filter-modal" v-if="filterOpen" @click="filterOpen = false">
    </div>
    <div class="filter__wrapper" ref="wrapperRef" :class="{ open: filterOpen }">
        <button :style="{ cursor: 'pointer', color: '#AB0000' }" v-streamed-text="5" v-leave-text :class="{ open: filterOpen }"
            @click="filterOpen = !filterOpen">
            Filter
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
const { filterOpen, filterActive, isEmpty } = useStoreFilter()

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
}

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.filter-modal {
    position: fixed;
    inset: 0;
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
    }

    button {
        text-align: start;
        text-transform: capitalize;

        // color: $discard-text;
        color: $primary;

        transition: opacity 200ms, color 200ms;

        &::after {
            content: "select";
            position: absolute;
            left: 1rem;
            top: 0.5rem;
            color: $neutral-text;
            pointer-events: none;
            opacity: 0;
            transition: opacity 200ms;
        }

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
