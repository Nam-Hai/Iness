export type OverviewData = {
    image: string,
    dimensions: {
        width: number,
        height: number
    },
    alt: string
}
export type ProjectData = {
    title: string,
    route: string,
    client: string,
    type: string,
    date: string,
    project_images: ProjectImage[]
}
export type ProjectImage = {
    url: string,
    dimensions: {
        width: number,
        height: number
    },
    alt: string,
    description: string
}

export type FilterData = string[]

export type PrismicData = {
    overview: OverviewData[],
    projects: ProjectData[],
    filters: FilterData
}

export const usePreloader = createStore(() => {
    const prismicData = ref() as Ref<PrismicData>

    const fromPreloader = ref(true)
    const preloaderComplete = ref(false);

    const loadPrismic = async () => {
        const { client } = usePrismic()
        const { data } = await useAsyncData('prismic', async () => {
            const overviewPromise = client.getAllByType('overviewitem', {
                graphQuery: `{
                    overviewitem {
                        overview_image
                    }
                }`
            })

            const projectPromise = client.getAllByType('project', {
                graphQuery: `{
                    project {
                        title
                        client
                        date
                        project_images {
                            project_image
                            description
                        }
                        type {
                            ...on filter {
                                filter
                            }
                        }
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

            const [overviewData, projectData, filterData] = await Promise.all([overviewPromise, projectPromise, filterPromise])
            const overview: OverviewData[] = overviewData.map(d => {
                return {
                    image: d.data.overview_image.url,
                    dimensions: d.data.overview_image.dimensions,
                    alt: d.data.overview_image.alt
                }
            })

            const projects: ProjectData[] = projectData.map(d => {
                return {
                    title: d.data.title,
                    route: d.data.title.replace(/\s/g, '-'),
                    client: d.data.client,
                    type: d.data.type.data.filter,
                    date: d.data.date,
                    project_images: d.data.project_images.map((el: any) => {
                        return {
                            url: el.project_image.url,
                            dimensions: el.project_image.dimensions,
                            alt: el.project_image.alt,
                            description: el.description
                        }
                    })
                }
            })
            const filters: FilterData = filterData.map(d => {
                return d.data.filter
            })
            return {
                overview,
                projects,
                filters
            }
        })
        prismicData.value = data.value || { overview: [], projects: [], filters: [] }

        const { filterActive } = useStoreFilter()
        for (const f of prismicData.value.filters) {
            filterActive[f] = false
        }
    }

    return { loadPrismic, prismicData, fromPreloader, preloaderComplete, }
})