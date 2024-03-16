import type { ShallowReactive } from "nuxt/dist/app/compat/capi"

export type ProjectType = "Graphic Design" | "type 2" | "type 3"

export type Project = {
    title: string
    client: string
    type: ProjectType
    date: string
}

export const useStoreIndex = createStore(() => {
    const types: ProjectType[] = ["Graphic Design", "type 2", "type 3"]
    const projects: Project[] = [
        {
            title: "Gallery Identity",
            client: "Lilia Ben Salah",
            type: "Graphic Design",
            date: "2021"
        },
        {
            title: "title 2",
            client: "client 2",
            type: "type 2",
            date: "date 2"
        },
        {
            title: "title 3",
            client: "client 3",
            type: "type 3",
            date: "date 3"
        },
        {
            title: "title 4",
            client: "client 4",
            type: "type 2",
            date: "date 4"
        },
    ]

    return { projects, types }
})

export const useStoreFilter = createStore(() => {
    const filterActive: ShallowReactive<{ [key in ProjectType]: boolean }> = shallowReactive({
        "Graphic Design": true,
        "type 2": false,
        "type 3": false,
    })
    const isEmpty = computed(() => {
        for (const [type, active] of Object.entries(filterActive)) {
            if (active) return false
        }
        return true
    })
    const filterOpen = shallowRef(false)
    return {
        filterActive,
        isEmpty,
        filterOpen
    }
})