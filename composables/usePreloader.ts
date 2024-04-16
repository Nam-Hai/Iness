export type ProjectData = {
    title: string,
    route: string,
    client: string,
    type: string,
    date: string,
    cover: PrismicMedia,
    cover_mobile: PrismicMedia,
    project_images: ProjectImage[]
    project_images_mobile: ProjectImage[]
}
export type ProjectImage = {
    image: PrismicMedia,
    controller: boolean,
    description: string,
    column: number
}

export type RichText = {

    text: string,
    spans: {
        type: "hyperlink",
        end: number,
        start: number,
        data: {
            link_type: "Web",
            url: string,
            target: "_blank"
        }
    }[]
}

export type PrismicMedia = {
    id: string,
    kind: 'image',
    name: string,
    size: string,
    url: string,
    width: string,
    height: string
} | {
    id: string,
    kind: 'video',
    name: string,
    size: string,
    url: string,
}

export type FilterData = string[]

export type PrismicData = {
    overview: PrismicMedia[],
    projects: ProjectData[],
    filters: FilterData,
    info: RichText[][],
}

export const usePreloader = createStore(() => {
    const prismicData = ref() as Ref<PrismicData>

    const fromPreloader = ref(true)
    const preloaderComplete = ref(false);

    const loadPrismic = async () => {
        const { client } = usePrismic()
        const { data } = await useAsyncData('prismic', async () => {

            const overviewPromise = client.getAllByType('overview', {
                graphQuery: `{
                    overview {
                        overview-video-image
                    }
                }`
            })

            const projectPromise = client.getAllByType('project', {
                graphQuery: `{
                    project {
                        title
                        client_name
                        date
                        cover
                        cover_mobile
                        project_images {
                            project_image
                            description
                            controller
                            width_column
                        }
                        project_images_mobile {
                            project_image
                            description
                            controller
                            width_column
                        }
                        type {
                            ...on filter {
                                filter
                            }
                        }
                    }
                }`
            })

            const infoPromise = client.getAllByType('info', {
                graphQuery: `{
                    info {
                        info-text
                    }
                }`
            })
            const filterPromise = client.getAllByType('filter', {
                graphQuery: `{
                    filter {
                        filter
                    }
                }`
            })

            const [overviewData, projectData, filterData, infoData] = await Promise.all([overviewPromise, projectPromise, filterPromise, infoPromise])
            const overview: PrismicMedia[] = overviewData.map(d => {
                return d.data["overview-video-image"]
            })

            const projects: ProjectData[] = projectData.map(d => {
                return {
                    title: d.data.title || "Projet",
                    route: d.data.title.replace(/\s/g, '-'),
                    client: d.data.client || "",
                    type: d.data.type.data.filter,
                    date: d.data.date || "2024",
                    cover: d.data.cover,
                    cover_mobile: d.data.cover_mobile,
                    project_images: d.data.project_images.map((el: any) => {
                        return {
                            controller: el.controller || false,
                            description: el.description || "",
                            column: el.width_column || 4,
                            image: el.project_image
                        }
                    }),
                    project_images_mobile: d.data.project_images_mobile.map((el: any) => {
                        return {
                            controller: el.controller || false,
                            description: el.description || "",
                            column: el.width_column || 4,
                            image: el.project_image
                        }
                    })
                }
            })

            const filters: FilterData = filterData.map(d => {
                return d.data.filter
            })

            const info: RichText[][] = infoData.map(d => {
                return d.data['info-text'].map((richText: any) => {
                    return {
                        text: richText.text,
                        spans: richText.spans
                    }
                })
            })

            return {
                overview,
                projects,
                filters,
                info,
            }
        })
        prismicData.value = data.value || { overview: [], info: [], filters: [], projects: [] }

        const { filterActive } = useStoreFilter()
        for (const f of prismicData.value.filters) {
            filterActive[f] = false
        }
    }

    return { loadPrismic, prismicData, fromPreloader, preloaderComplete, }
})