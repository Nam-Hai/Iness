import { useFlowProvider } from "~/waterflow/FlowProvider";


const STAGGER_MS = 25
const SPEED_MS = 5
const test = 150

export const vStreamedText = {
    mounted: (el: HTMLElement) => {
        const { count } = useStoreTransition()
        const flowProvider = useFlowProvider()
        // console.log(flowProvider.getRouteTo().name); 
        console.log(flowProvider.flowIsHijacked.value);
        if (flowProvider.getRouteTo().name === "projects-id" || !flowProvider.flowIsHijacked.value) return
        const text = el.innerText
        const char = text.split('')
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
                delay: N.Ease.o2(Math.min(index, test) / test) * test * SPEED_MS + count.value * STAGGER_MS,
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
                delay: N.Ease.o2(Math.min(index, test) / test) * test * SPEED_MS + count.value * STAGGER_MS,
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
const map = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,^'."