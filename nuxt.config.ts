// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    ssr: false,

    // nitro: {
    //     preset: "vercel",
    // },

    css: ["@/styles/core.scss", "@/styles/app/index.scss"],

    components: {
        global: true,
        dirs: [
            "~/components/lib/",
            "~/components/app/",
        ],
    },

    app: {
        head: {
            meta: [
                {
                    name: "viewport",
                    content:
                        "width=device-width initial-scale=1 maximum-scale=1.2 user-scalable=no",
                },
                {
                    charset: "utf-8",
                },
                {
                    name: "theme-color",
                    content: "#F7F5F2",
                },
                {
                    key: "description", name: "description",
                    content: "Insert description"
                },
                { key: "og:title", property: "og:title", content: "Oscar Pico — Digital Designer" },
                {
                    key: "og:url",
                    property: "og:url",
                    content: "lorem.com",
                },
                {
                    key: "og:description",
                    property: "og:description",
                    content: "Insert description",
                },
                {
                    key: "og:image",
                    property: "og:image",
                    content: "/2.jpg",
                },
                // twitter card
                {
                    key: "twitter:title",
                    name: "twitter:title",
                    content: "Iness portfolio",
                },
                {
                    key: "twitter:url",
                    name: "twitter:url",
                    content: "lorem.com",
                },
                {
                    key: "twitter:description",
                    name: "twitter:description",
                    content: "Iness portfolio",
                },
                {
                    key: "twitter:image",
                    name: "twitter:image",
                    content: "2.jpg",
                },
                {
                    key: "twitter:card",
                    name: "twitter:card",
                    content: "summary_large_image",
                }
            ],
            title: "Oscar Pico — Digital Designer",
            link: [

                // {
                //     rel: "icon",
                //     type: "image/png",
                //     sizes: "32x32",
                //     href: "/favicon/favicon-32x32.png",
                //     class: "dark",
                // },
                // {
                //     rel: "icon",
                //     type: "image/png",
                //     sizes: "16x16x",
                //     href: "/favicon/favicon-16x16.png",
                //     class: "dark",
                // },
                // {
                //     rel: "icon",
                //     type: "image/png",
                //     sizes: "32x32",
                //     href: "/favicon/favicon-32x32_light.png",
                //     class: "light",
                // },
                // {
                //     rel: "icon",
                //     type: "image/png",
                //     sizes: "16x16x",
                //     href: "/favicon/favicon-16x16_light.png",
                //     class: "light",
                // },
                // {
                //     rel: "apple-touch-icon",
                //     sizes: "180x180",
                //     href: "/favicon/apple-touch-icon.png"
                // },
                // {
                //     rel: "mask-icon",
                //     href: "/favicon/safari-pinned-tab.svg",
                //     color: "#292929"
                // }
            ],
        },
    },
});
