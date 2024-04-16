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
    description?: string,
    column?: number
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
    // // projects: ProjectData[],
    // filters: FilterData,
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

            // const projectPromise = client.getAllByType('project', {
            //     graphQuery: `{
            //         project {
            //             title
            //             client
            //             date
            //             project_images {
            //                 project_image
            //                 description
            //                 width_column
            //             }
            //             type {
            //                 ...on filter {
            //                     filter
            //                 }
            //             }
            //         }
            //     }`
            // })

            const infoPromise = client.getAllByType('info', {
                graphQuery: `{
                    info {
                        info-text
                    }
                }`
            })
            // const filterPromise = client.getAllByType('filter', {
            //     graphQuery: `{
            //         filter {
            //             filter
            //         }
            //     }`
            // })

            // const [overviewData, projectData, filterData, infoData] = await Promise.all([overviewPromise, projectPromise, filterPromise, infoPromise])
            const [overviewData, infoData] = await Promise.all([overviewPromise, infoPromise])
            const overview: PrismicMedia[] = overviewData.map(d => {
                return d.data["overview-video-image"]
            })

            // const projects: ProjectData[] = projectData.map(d => {
            //     return {
            //         title: d.data.title,
            //         route: d.data.title.replace(/\s/g, '-'),
            //         client: d.data.client,
            //         type: d.data.type.data.filter,
            //         date: d.data.date,
            //         project_images: d.data.project_images.map((el: any) => {
            //             return {
            //                 url: el.project_image.url,
            //                 dimensions: el.project_image.dimensions,
            //                 alt: el.project_image.alt,
            //                 description: el.description,
            //                 column: el.width_column
            //             }
            //         })
            //     }
            // })
            // const filters: FilterData = filterData.map(d => {
            //     return d.data.filter
            // })

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
                // projects,
                // filters,
                info,
            }
        })
        prismicData.value = data.value || { overview: [], info: [] }

        // const { filterActive } = useStoreFilter()
        // for (const f of prismicData.value.filters) {
        //     filterActive[f] = false
        // }
    }

    return { loadPrismic, prismicData, fromPreloader, preloaderComplete, }
})