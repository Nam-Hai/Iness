<template>
    <div class="filter__wrapper" ref="wrapperRef" @mouseenter="filterOpen = true" @mouseleave="filterOpen = false"
        :class="{ open: filterOpen }">
        <span :style="{ cursor: 'default' }">
            Filter {{ filterOpen ? "-" : "+" }}
        </span>

        <button v-for="filter in prismicData.filters"
            :class="{ active: filterActive[filter] || isEmpty, hide: !filterOpen }" @click="toggleFilter(filter)">
            {{ filter }}
        </button>
    </div>
</template>

<script lang="ts" setup>

const wrapperRef = ref() as Ref<HTMLElement>

const { prismicData } = usePreloader()
const { filterOpen, filterActive, isEmpty } = useStoreFilter()

function toggleFilter(filter: string) {
    filterActive[filter] = !filterActive[filter]
}

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.filter__wrapper {
    font-weight: 500;

    display: flex;
    flex-direction: column;
    row-gap: 5rem;
    height: 2rem;
    &.open {
        height: auto;
    }


    button {
        text-align: start;
        text-transform: capitalize;
        transition: color 200ms;

        color: $discard-text;

        transition: opacity 200ms;
        &.hide {
            pointer-events: none;
            opacity: 0;
        }

        &.active {
            // color: $primary;
            color: $neutral-text;
        }
    }
}

</style>
