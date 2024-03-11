export type PrismicData = {
    image: string,
    dimensions: {
        width: number,
        height: number
    },
    alt: string
}

export const usePreloader = createStore(() => {
    const prismicData = ref() as Ref<PrismicData[]>

    const fromPreloader = ref(true)
    const preloaderComplete = ref(false);

    const loadPrismic = async () => {
        const { client } = usePrismic()
        console.log(client);
        const { data } = await useAsyncData('prismic', async () => {
            const prismicData = await client.getAllByType('project', {
                graphQuery: `{
                    projects {
                        image
                    }
                }`
            })
            console.log(prismicData);
            const data: PrismicData[] = prismicData.map(d => {
                return {
                    image: d.data.image.url,
                    dimensions: d.data.image.dimensions,
                    alt: d.data.image.alt
                }
            })
            return data
        })
        prismicData.value = data.value || []
    }

    return { loadPrismic, prismicData, fromPreloader, preloaderComplete, }
})