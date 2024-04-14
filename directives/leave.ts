import { onLeave } from "~/waterflow/composables/onFlow"

export const vLeave = {
    mounted: (el: HTMLElement) => {

        const tl = useTL()
        onLeave(() => {
            tl.from({
                el,
                p: {
                    o: [1, 0]
                },
                d: 100,
                delay: 600,
            })
            tl.play()
        }, { once: true })
    }
}


export const vLeaveImg = {
    mounted: (el: HTMLElement) => {

        onLeave(() => { 
            el.style.transition = "opacity 80ms"
            N.O(el, 0)

        }, { once: true })
    }
}