type ProjectType = "type 1" | "type 2" | "type 3"

type Project = {
    title: string
    client: string
    type: ProjectType
    data: string
}

export const useStoreIndex = createStore(() => {
    const project = [
        {
            title: "title 1",
            client: "client 1",
            type: "type 1",
            data: "date 1"
        },
        {
            title: "title 2",
            client: "client 2",
            type: "type 1",
            data: "date 2"
        },
        {
            title: "title 3",
            client: "client 3",
            type: "type 3",
            data: "date 3"
        },
        {
            title: "title 4",
            client: "client 4",
            type: "type 2",
            data: "date 4"
        },
    ]
    return { project }
})