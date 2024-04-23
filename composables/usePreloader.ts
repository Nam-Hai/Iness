export type ProjectData = {
    title: string,
    route: string,
    client: string,
    type: string,
    date: string,
    order: number,
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

type OverviewData = {
    image: PrismicMedia,
    image_mobile: PrismicMedia,
    order: number
}
export type PrismicData = {
    overview: OverviewData[],
    projects: ProjectData[],
    filters: FilterData,
    info: {
        text: RichText[],
        order: number
    }[]
    // info: RichText[][],
    bottomText: { mobile: string, desktop: string }
}

export const usePreloader = createStore(() => {
    const prismicData = ref() as Ref<PrismicData>

    const fromPreloader = ref(true)
    const preloaderComplete = ref(false);

    const loadPrismic = async () => {
        return new Promise<void>(async (res) => {
            const { client } = usePrismic()
            const { data } = await useAsyncData('prismic', async () => {

                const overviewPromise = client.getAllByType('overview', {
                    graphQuery: `{
                    overview {
                        overview-video-image
                        overview-mobile-video-image
                        order
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
                        order
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
                        order
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

                const bottomTextPromise = client.getByType("bottom_text")
                const [overviewData, projectData, filterData, infoData, bottomTextData] = await Promise.all([overviewPromise, projectPromise, filterPromise, infoPromise, bottomTextPromise])
                const bottomText: { mobile: string, desktop: string } = {
                    mobile: bottomTextData.results[0].data.mobile || "",
                    desktop: bottomTextData.results[0].data.desktop || ""
                }

                const placeholderMedia: PrismicMedia = {
                    id: "-1",
                    kind: "image",
                    name: "placeholder",
                    width: "392",
                    height: "476",
                    size: "2000",
                    url: "/Assets/2.png"

                }

                const overview: OverviewData[] = overviewData.map(d => {
                    return {
                        image: d.data["overview-video-image"].id ? d.data["overview-video-image"] : placeholderMedia,
                        image_mobile: d.data["overview-mobile-video-image"].id ? d.data["overview-mobile-video-image"] : placeholderMedia,
                        order: +d.data.order || 0
                    }
                }).sort((a, b) => a.order - b.order)

                const projects: ProjectData[] = projectData.map(d => {
                    return {
                        title: d.data.title || "Projet",
                        route: (d.data.title || "Project").replace(/\s/g, '-'),
                        client: d.data.client_name || "",
                        type: d.data.type.id ? d.data.type.data.filter : "Filter placeholder",
                        date: d.data.date || "2024",
                        order: +d.data.order || 0,
                        cover: d.data.cover.id ? d.data.cover : placeholderMedia,
                        cover_mobile: d.data.cover_mobile.id ? d.data.cover_mobile : placeholderMedia,
                        project_images: d.data.project_images.map((el: any) => {
                            return {
                                controller: el.controller || false,
                                description: el.description || "",
                                column: el.width_column || 4,
                                image: el.project_image.id ? el.project_image : placeholderMedia
                            }
                        }),
                        project_images_mobile: d.data.project_images_mobile.map((el: any) => {
                            return {
                                controller: el.controller || false,
                                description: el.description || "",
                                column: el.width_column || 4,
                                image: el.project_image.id ? el.project_image : placeholderMedia
                            }
                        })
                    }
                }).sort((a, b) => a.order - b.order)

                const filters: FilterData = filterData.map(d => {
                    return d.data.filter
                })

                const info: { order: number, text: RichText[] }[] = infoData.map(d => {
                    return {
                        order: +d.data.order || 0,
                        text: d.data['info-text'].map((richText: any) => {
                            return {
                                text: richText.text,
                                spans: richText.spans
                            }
                        })
                    }
                }).sort((a, b) => a.order - b.order)

                return {
                    overview,
                    projects,
                    filters,
                    info,
                    bottomText
                }
            })
            prismicData.value = data.value || { overview: [], info: [], filters: [], projects: [], bottomText: { mobile: "", desktop: "" } }

            const { filterActive } = useStoreFilter()
            for (const f of prismicData.value.filters) {
                filterActive[f] = false
            }

            res()
        })
    }

    return { loadPrismic, prismicData, fromPreloader, preloaderComplete, }
})