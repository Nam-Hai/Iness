import type { ShallowReactive } from "nuxt/dist/app/compat/capi"

export const useStoreProject = createStore(() => {
    return {

    }
})

export const useStoreFilter = createStore(() => {
    const filterActive: ShallowReactive<{ [key in string]: boolean }> = shallowReactive({
    })


    const isEmpty = computed(() => {
        for (const [type, active] of Object.entries(filterActive)) {
            if (active) return false
        }
        return true
    })

    const filterOpen = shallowRef(false)

    function resetFilter() {
        for (const [type, active] of Object.entries(filterActive)) {
            filterActive[type] = false
        }
    }

    return {
        filterActive,
        resetFilter,
        isEmpty,
        filterOpen
    }
})