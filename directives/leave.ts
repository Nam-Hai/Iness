import { useFlowProvider } from "~/waterflow/FlowProvider"
import { onLeave } from "~/waterflow/composables/onFlow"

const STAGGER_MS = 20
const SPEED_MS = 500
const wordMax = 30
const map = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\h\|()1{}[]?-_+~<>i!lI;:,^'."
export const vLeaveText = {
    mounted: (el: HTMLElement, binding: any) => {

        const { leaveCount, getResolverLeave, getPromise } = useStoreTransition()

        onLeave(async () => {
            const _count = leaveCount.value
            console.log(el, leaveCount.value);
            leaveCount.value++
            await getPromise()

            const text = el.innerText
            const char = text.split('')

            const wordLength = char.length
            const ratio = Math.min(wordMax, wordLength) / wordMax
            const spans = N.getAll('span', el)
            const tl = useTL()
            for (let index = spans.length - 1; index >= 0; index--) {
                const span = spans[index] as HTMLElement
                const letter = char[index]
                let i = 0
                const delayIndex = (spans.length - 1 - index) / (spans.length > wordLength ? spans.length - 1 : wordLength)
                tl.from({
                    el: span,
                    p: {
                        o: [1, 0]
                    },
                    d: 50,
                    delay: N.Ease.linear(delayIndex) * ratio * SPEED_MS + 150,
                }).from({
                    update: (t) => {
                        i++
                        if (letter === " ") {
                            return
                        }
                        if (i < 2) return
                        i = 0
                        if (span) span.innerText = map[Math.floor(N.Rand.range(0, map.length - 1, 1))]
                    },
                    d: 200,
                    delay: N.Ease.linear(delayIndex) * ratio * SPEED_MS,
                    cb() {
                        if (span) span.innerText = letter
                    },
                })
            }
            tl.from({
                delay: ratio * SPEED_MS + 200,
                update({ prog, progE }) {
                },
                e: "io3",
                d: 0,
                cb() {
                    if (_count === 0) {
                        console.log("RESOLVE YEAHHHHH");
                        getResolverLeave()()
                    }
                }
            })

            tl.play()
        }, { once: true })

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