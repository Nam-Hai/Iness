import type { ShallowReactive } from "nuxt/dist/app/compat/capi"

export const useStoreProjectImage = createStore(() => {
    const placeholderPos = { x: 0, y: 0, w: 0, h: 0 }
    const placeholderPosFrom = shallowRef({ x: 0, y: 0, width: 0, height: 0 })
    const bounds = ref() as Ref<DOMRect[]>
    const currentImage = ref(0)
    const currentImageShow = ref(0)

    return {
        placeholderPos,
        placeholderPosFrom,
        currentImage,
        currentImageShow,
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