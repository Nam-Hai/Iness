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
    client: string,
    type: string,
    date: string,
    preview_image: {
        url: string,
        dimensions: {
            width: number,
            height: number
        },
        alt: string
    }
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
            const overviewData = await client.getAllByType('overviewitem', {
                graphQuery: `{
                    overviewitem {
                        overview_image
                    }
                }`
            })

            const overview: OverviewData[] = overviewData.map(d => {
                return {
                    image: d.data.overview_image.url,
                    dimensions: d.data.overview_image.dimensions,
                    alt: d.data.overview_image.alt
                }
            })

            const projectData = await client.getAllByType('project', {
                graphQuery: `{
                    project {
                        title
                        client
                        date
                        image
                        type {
                            ...on filter {
                                filter
                            }
                        }

                    }
                }`
            })
            const projects: ProjectData[] = projectData.map(d => {
                return {
                    title: d.data.title,
                    client: d.data.client,
                    type: d.data.type.data.filter,
                    date: d.data.date,
                    preview_image: {
                        url: d.data.image.url,
                        dimensions: d.data.image.dimensions,
                        alt: d.data.image.alt
                    }
                }
            })

            const filterData = await client.getAllByType('filter', {
                graphQuery: `{
                    filter {
                        filter
                    }
                }`
            })
            const filters: FilterData = filterData.map(d => {
                return d.data.filter
            })
            return {
                overview,
                projects: projects,
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