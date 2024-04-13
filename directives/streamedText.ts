import { useFlowProvider } from "~/waterflow/FlowProvider";
import { onLeave } from "~/waterflow/composables/onFlow";


const STAGGER_MS = 20
const SPEED_MS = 500
const wordMax = 30

export const vStreamedText = {
    mounted: (el: HTMLElement, binding: any) => {

        const { count } = useStoreTransition()

        const delayCount = binding.value || count.value


        const flowProvider = useFlowProvider()
        const { breakpoint } = useStoreView()
        if (flowProvider.getRouteTo().name === "projects-id" && breakpoint.value === "desktop" || !flowProvider.flowIsHijacked.value && !(flowProvider.getRouteTo().name === "projects-id" && breakpoint.value === "mobile")) return
        const text = el.innerText
        const char = text.split('')

        const wordLength = char.length
        const ratio = Math.min(wordMax, wordLength) / wordMax
        el.innerHTML = ""
        const spans: HTMLElement[] = []
        for (const c of char) {
            const span = N.Cr('span')
            spans.push(span)
            span.innerText = c
            N.O(span, 0)
            el.appendChild(span)
        }

        const tl = useTL()
        for (let index = 0; index < spans.length; index++) {
            const span = spans[index]
            const letter = char[index]
            if (letter !== " ") {
                span.innerText = map[Math.floor(N.Rand.range(0, map.length - 1, 1))]
            }
            let i = 0
            tl.from({
                el: span,
                p: {
                    o: [0, 1]
                },
                d: 50,
                delay: N.Ease.o2(Math.min(index, wordLength) / wordLength) * ratio * SPEED_MS + delayCount * STAGGER_MS,
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
                delay: N.Ease.o2(Math.min(index, wordLength) / wordLength) * ratio * SPEED_MS + delayCount * STAGGER_MS,
                cb() {
                    span.innerText = letter
                },
            })
        }
        count.value++

        tl.play()
    }
}
// const MAP = ["A", "B", "c", "#", "3", "/", "9", "5", "2", "e", "o","P", "p",'O',"y", "q", "W", ",", "@", "7", "&", "{", "}", "|","<", ">", "x", "c", "D", "E", "H"]
const map = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\h\|()1{}[]?-_+~<>i!lI;:,^'."
export const vStreamedText2 = {
    mounted: (el: HTMLElement) => {
        const { count } = useStoreTransition()
        const flowProvider = useFlowProvider()
        const text = el.innerText
        const char = text.split('')
        const wordLength = char.length
        const ratio = Math.min(wordMax, wordLength) / wordMax
        el.innerHTML = ""
        const spans: HTMLElement[] = []
        for (const c of char) {
            const span = N.Cr('span')
            spans.push(span)
            span.innerText = c
            N.O(span, 0)
            el.appendChild(span)
        }

        const tl = useTL()
        for (let index = 0; index < spans.length; index++) {
            const span = spans[index]
            const letter = char[index]
            let i = 0
            tl.from({
                el: span,
                p: {
                    o: [0, 1]
                },
                d: 50,
                delay: N.Ease.o2(Math.min(index, wordLength) / wordLength) * ratio * wordLength * SPEED_MS + count.value * STAGGER_MS,
            }).from({
                update: (t) => {
                    if (letter === " ") {
                        return
                    }
                    i++
                    if (i < 4) return
                    i = 0
                    span.innerText = map[Math.floor(N.Rand.range(0, map.length - 1, 1))]
                },
                d: 200,
                delay: N.Ease.o2(Math.min(index, wordLength) / wordLength) * ratio * wordLength * SPEED_MS + count.value * STAGGER_MS,
                cb() {
                    span.innerText = letter
                },
            })
        }
        count.value++

        tl.play()
    }
}

export const vStreamedTextMenu = {
    mounted: (el: HTMLElement) => {
        const { count } = useStoreTransition()
        const flowProvider = useFlowProvider()
        const { breakpoint } = useStoreView()
        if (flowProvider.getRouteTo().name === "projects-id" && breakpoint.value === "desktop" || !flowProvider.flowIsHijacked.value && !(flowProvider.getRouteTo().name === "projects-id" && breakpoint.value === "mobile")) return
        const text = el.innerText
        const char = text.split('')
        const wordLength = char.length
        const ratio = Math.min(wordMax, wordLength) / wordMax

        el.innerHTML = ""
        const spans: HTMLElement[] = []
        for (const c of char) {
            const span = N.Cr('span')
            spans.push(span)
            span.innerText = c
            N.O(span, 0)
            el.appendChild(span)
        }

        const tl = useTL()
        for (let index = 0; index < spans.length; index++) {
            const span = spans[index]
            const letter = char[index]
            let i = 0
            tl.from({
                el: span,
                p: {
                    o: [0, 1]
                },
                d: 50,
                delay: N.Ease.o2(Math.min(index, wordLength) / wordLength) * ratio * SPEED_MS + count.value * STAGGER_MS,
            }).from({
                update: (t) => {
                    if (letter === " ") {
                        return
                    }
                    i++
                    if (i < 4) return
                    i = 0
                    span.innerText = map[Math.floor(N.Rand.range(0, map.length - 1, 1))]
                },
                d: 200,
                delay: N.Ease.o2(Math.min(index, wordLength) / wordLength) * ratio * SPEED_MS + count.value * STAGGER_MS,
                cb() {
                    span.innerText = letter
                },
            })
        }
        count.value++

        tl.play()
    }
}