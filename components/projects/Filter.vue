<template>
    <div class="filter__wrapper" ref="wrapperRef" @mouseenter="filterOpen = true" @mouseleave="filterOpen = false"
        :class="{ open: filterOpen }">
        <span :style="{ cursor: 'default' }" v-streamed-text="5" :class="{ open: filterOpen }"
            @click="filterOpen = !filterOpen">
            Filter
        </span>
        <button @click="toggleFilterAll()" :class="{ active: toggledAll, hide: !filterOpen }">
            All
        </button>

        <button v-for="filter in prismicData.filters" :class="{ active: filterActive[filter], hide: !filterOpen }"
            @click="toggleFilter(filter)">
            {{ filter }}
        </button>
    </div>
</template>

<script lang="ts" setup>
import { vStreamedText } from '~/directives/streamedText';

const wrapperRef = ref() as Ref<HTMLElement>

const { prismicData } = usePreloader()
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

.filter__wrapper {
    font-weight: 500;

    display: flex;
    flex-direction: column;
    row-gap: 3.6rem;
    height: 2rem;

    &.open {
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
        height: auto;
    }


    button {
        text-align: start;
        text-transform: capitalize;

        // color: $discard-text;
        color: $primary;

        transition: opacity 200ms, color 200ms;

        &.hide {
            pointer-events: none;
            opacity: 0;
        }

        &.active {
            // color: $primary;
            color: $neutral-text;
        }

        &:hover {
            color: $discard-text;
            &.active {
                color: $neutral-text;
            }
        }
    }
}
</style>
