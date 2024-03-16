<template>
    <div class="filter__wrapper" ref="wrapperRef" @mouseenter="filterOpen = true" @mouseleave="filterOpen = false"
        :class="{ open: filterOpen }">
        <span :style="{ cursor: 'default' }">
            Filter {{ filterOpen ? "-" : "+" }}
        </span>

        <button v-for="filter in types" v-if="filterOpen" :class="{ active: filterActive[filter] || isEmpty }"
            @click="toggleFilter(filter)">
            {{ filter }}
        </button>
    </div>
</template>

<script lang="ts" setup>

const { types } = useStoreIndex()

const wrapperRef = ref() as Ref<HTMLElement>

const { filterOpen, filterActive, isEmpty } = useStoreFilter()

function toggleFilter(filter: ProjectType) {
    filterActive[filter] = !filterActive[filter]
}

</script>

<style lang="scss" scoped>
@use "@/styles/shared.scss" as *;

.filter__wrapper {
    font-weight: 500;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &.open {
        height: $grid-cell-height;
    }

    button {
        text-align: start;
        text-transform: capitalize;
        transition: color 200ms;

        color: $discard-text;

        &.active {
            // color: $primary;
            color: $neutral-text;
        }
    }
}
</style>
