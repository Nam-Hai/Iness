// https://nuxt.com/docs/api/configuration/nuxt-config

const title = "in e Studio"
const description = "Ines Jaïbi's design studio and space, where creation and experimentation take center stage."

export default defineNuxtConfig({
    ssr: false,
    devtools: {
        enabled: false,
    },
    css: ["@/styles/core.scss", "@/styles/app/index.scss"],
    modules: [
        "@nuxtjs/prismic"
    ],
    prismic: {
        endpoint: 'https://iness-portfolio.cdn.prismic.io/api/v2',
        preview: false,
        toolbar: false
    },
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
            htmlAttrs: {
                lang: 'fr',
                style: "#FBFBFB"
            },
            meta: [
                {
                    charset: "utf-8",
                },
                {
                    name: "viewport",
                    content:
                        "width=device-width initial-scale=1 maximum-scale=1 user-scalable=no",
                },
                {
                    name: "theme-color",
                    content: "#FBFBFB",
                },
                {
                    key: "description", name: "description",
                    content: description
                },
                { key: "og:title", property: "og:title", content: title },
                {
                    key: "og:url",
                    property: "og:url",
                    content: "https://www.in-e-studio.com",
                },
                {
                    key: "og:description",
                    property: "og:description",
                    content: description,
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
                    content: title,
                },
                {
                    key: "twitter:url",
                    name: "twitter:url",
                    content: "https://www.in-e-studio.com",
                },
                {
                    key: "twitter:description",
                    name: "twitter:description",
                    content: description,
                },
                {
                    key: "twitter:image",
                    name: "twitter:image",
                    content: "TODO",
                },
                {
                    key: "twitter:card",
                    name: "twitter:card",
                    content: "sumary",
                }
            ],
            title,
            link: [
                {
                    rel: "manifest",
                    href: "/site.webmanifest"
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
