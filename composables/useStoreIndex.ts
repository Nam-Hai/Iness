export type ProjectType = "Graphic Design" | "type 2" | "type 3"

export type Project = {
    title: string
    client: string
    type: ProjectType
    date: string
}

export const useStoreIndex = createStore(() => {
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
    return { projects }
})