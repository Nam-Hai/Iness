import { useFlowProvider } from "~/waterflow/FlowProvider"
import { onLeave } from "~/waterflow/composables/onFlow"

const STAGGER_MS = 20
const SPEED_MS = 500
const wordMax = 30
const map = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\h\|()1{}[]?-_+~<>i!lI;:,^'."
export const vLeaveText = {
    mounted: (el: HTMLElement, binding: any) => {

        const { leaveCount } = useStoreTransition()

        const delayCount = 0


        const flowProvider = useFlowProvider()
        const { breakpoint } = useStoreView()
        if (flowProvider.getRouteTo().name === "projects-id" && breakpoint.value === "desktop" || !flowProvider.flowIsHijacked.value && !(flowProvider.getRouteTo().name === "projects-id" && breakpoint.value === "mobile") || (flowProvider.getRouteTo().name === "projects" && flowProvider.getRouteFrom().name === "projects-id" && breakpoint.value === "desktop")) return

        onLeave(() => {
            const text = el.innerText
            const char = text.split('')

            const wordLength = char.length
            const ratio = Math.min(wordMax, wordLength) / wordMax
            const spans = N.getAll('span', el)
            const tl = useTL()
            for (let index = 0; index < spans.length; index++) {
                const span = spans[index] as HTMLElement
                const letter = char[index]
                let i = 0
                tl.from({
                    el: span,
                    p: {
                        o: [1, 0]
                    },
                    d: 50,
                    delay: N.Ease.o2(Math.min(index, wordLength) / wordLength) * ratio * SPEED_MS + delayCount * STAGGER_MS + 200 + 800,
                }).from({
                    update: (t) => {
                        i++
                        if (letter === " ") {
                            return
                        }
                        if (i < 4) return
                        i = 0
                        span.innerText = map[Math.floor(N.Rand.range(0, map.length - 1, 1))]
                    },
                    d: 200,
                    delay: N.Ease.o2(Math.min(index, wordLength) / wordLength) * ratio * SPEED_MS + delayCount * STAGGER_MS + 800,
                    cb() {
                        span.innerText = letter
                    },
                })
            }
            leaveCount.value++

            tl.play()
        })

    }
}

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