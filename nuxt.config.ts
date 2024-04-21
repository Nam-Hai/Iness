// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    ssr: false,

    // nitro: {
    //     preset: "vercel",
    // },

    css: ["@/styles/core.scss", "@/styles/app/index.scss"],
    modules: [
        "@nuxtjs/prismic"
    ],
    prismic: {
        endpoint: 'https://iness-portfolio.cdn.prismic.io/api/v2',
        preview: false,
        toolbar: false
    },
    // image: {
    //     format: ['webp']
    // },
    components: {
        global: true,
        dirs: [
            "~/components/lib/",
            "~/components/app/",
            "~/components/index/",
            "~/components/projects/",

        ],
    },

    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            htmlAttrs: {
                lang: 'fr'
            },
            meta: [
                {
                    name: "theme-color",
                    content: "#FBFBFB",
                },
                {
                    key: "description", name: "description",
                    content: "TODO"
                },
                { key: "og:title", property: "og:title", content: "TODO" },
                {
                    key: "og:url",
                    property: "og:url",
                    content: "TODO",
                },
                {
                    key: "og:description",
                    property: "og:description",
                    content: "TODO",
                },
                {
                    key: "og:image",
                    property: "og:image",
                    content: "TODO",
                },
                // twitter card
                {
                    key: "twitter:title",
                    name: "twitter:title",
                    content: "TODO",
                },
                {
                    key: "twitter:url",
                    name: "twitter:url",
                    content: "TODO",
                },
                {
                    key: "twitter:description",
                    name: "twitter:description",
                    content: "TODO",
                },
                {
                    key: "twitter:image",
                    name: "twitter:image",
                    content: "TODO",
                },
                {
                    key: "twitter:card",
                    name: "twitter:card",
                    content: "TODO",
                }
            ],
            title: "Iness - Portfolio",
            link: [
                {
                    rel: "manifest",
                    href: "/favicon/site.webmanifest"
                },
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "32x32",
                    href: "/favicon/favicon-32x32.png",
                },
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "16x16x",
                    href: "/favicon/favicon-16x16.png",
                },
                {
                    rel: "apple-touch-icon",
                    sizes: "180x180",
                    href: "/favicon/apple-touch-icon.png"
                },
                {
                    rel: "mask-icon",
                    href: "/favicon/safari-pinned-tab.svg",
                    color: "#292929"
                }
            ],
        },
    },
});
