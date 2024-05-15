import { useFlowProvider } from "~/waterflow/FlowProvider";

function isElementInViewport(el: HTMLElement) {
    var rect = el.getBoundingClientRect();

    const vh = (window.innerHeight || document.documentElement.clientHeight)
    const vw = (window.innerWidth || document.documentElement.clientWidth)
    return (
        rect.top < vh || rect.bottom < 0
    );
}

const STAGGER_MS = 20
const SPEED_MS = 500
const wordMax = 30

export const vStreamedText = {
    mounted: (el: HTMLElement, binding: any) => {


        const inViewport = isElementInViewport(el)
        const { count, getCount, getResolver } = useStoreTransition()

        const delayCount = binding.value ?? count.value

        // if (!flowProvider.flowIsHijacked.value && !(flowProvider.getRouteTo().name === "projects-id" && breakpoint.value === "mobile")) return
        const text = el.innerText
        const char = text.split('')

        const wordLength = char.length
        const ratio = Math.min(wordMax, wordLength) / wordMax
        el.innerHTML = ""
        const spans: HTMLElement[] = []
        for (const c of char) {
            const span = N.Cr('span')
            span.innerText = c
            el.appendChild(span)
            spans.push(span)
            if (inViewport) {
                N.O(span, 0)
            }
        }
        if (!inViewport) {
            return
        }

        const _count = count.value
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
                delay: N.Ease.linear(Math.min(index, wordLength) / wordLength) * ratio * SPEED_MS + delayCount * STAGGER_MS,
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
                delay: N.Ease.linear(Math.min(index, wordLength) / wordLength) * ratio * SPEED_MS + delayCount * STAGGER_MS,
                cb() {
                    span.innerText = letter
                },
            })
        }
        tl.from({
            update({ prog, progE }) {
            },
            d: 20,
            delay: ratio * SPEED_MS + _count * STAGGER_MS + 200,
            cb() {
                if (getCount() - 1 === _count) {
                    getResolver()()
                }
            },
        })
        count.value++

        tl.play()
    }
}
// const MAP = ["A", "B", "c", "#", "3", "/", "9", "5", "2", "e", "o","P", "p",'O',"y", "q", "W", ",", "@", "7", "&", "{", "}", "|","<", ">", "x", "c", "D", "E", "H"]
const map = "$B%8&#*oahkbddvpqwmZO0QCJUYXzcvunxrjft/\\h\|()1{}[]?-+~<>i!lI;:,^'."
export const vStreamedText2 = {
    mounted: (el: HTMLElement) => {
        const { count, getResolver, getCount } = useStoreTransition()
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

        const _count = count.value
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
                delay: N.Ease.linear(Math.min(index, wordLength) / wordLength) * ratio * SPEED_MS + _count * STAGGER_MS,
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
                delay: N.Ease.linear(Math.min(index, wordLength) / wordLength) * ratio * SPEED_MS + _count * STAGGER_MS,

                cb() {
                    span.innerText = letter
                },
            })
        }
        tl.from({
            update({ prog, progE }) {
            },
            d: 20,
            delay: ratio * SPEED_MS + _count * STAGGER_MS + 200,
            cb() {

                if (getCount() - 1 === _count) {
                    getResolver()()
                }
            },
        })
        count.value++

        tl.play()
    }
}


export const vStreamedTextProject = {
    mounted: (el: HTMLElement, binding: any) => {

        const flowProvider = useFlowProvider()
        const { scroll } = useStoreScroll()
        const { breakpoint } = useStoreView()
        const inViewport = isElementInViewport(el)
        const { count, getCount, getResolver } = useStoreTransition()

        const delayCount = binding.value || count.value

        const projectScrollTest = (flowProvider.getRouteTo().name === "projects" || flowProvider.getRouteTo().name === "projects-id") && (flowProvider.getRouteFrom().name === 'projects' || flowProvider.getRouteFrom().name === 'projects-id') && scroll.value === 0 && breakpoint.value === 'desktop'

        // if (!flowProvider.flowIsHijacked.value && !(flowProvider.getRouteTo().name === "projects-id" && breakpoint.value === "mobile")) return
        const text = el.innerText
        const char = text.split('')

        const wordLength = char.length
        const ratio = Math.min(wordMax, wordLength) / wordMax
        el.innerHTML = ""
        const spans: HTMLElement[] = []
        for (const c of char) {
            const span = N.Cr('span')
            span.innerText = c
            el.appendChild(span)
            spans.push(span)
            if (inViewport && !projectScrollTest) {
                N.O(span, 0)
            }
        }
        if (projectScrollTest) {
            getResolver()()
            return
        }
        if (!inViewport) {
            return
        }

        const _count = count.value
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
                delay: N.Ease.linear(Math.min(index, wordLength) / wordLength) * ratio * SPEED_MS + delayCount * STAGGER_MS,
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
                delay: N.Ease.linear(Math.min(index, wordLength) / wordLength) * ratio * SPEED_MS + delayCount * STAGGER_MS,
                cb() {
                    span.innerText = letter
                },
            }).from({
                update() {

                },
                d: 0,
                delay: N.Ease.linear(Math.min(index, wordLength) / wordLength) * ratio * SPEED_MS + _count * STAGGER_MS + 200,
                cb() {
                    if (getCount() - 1 === _count && index === spans.length - 1) {
                        getResolver()()
                    }
                },
            })
        }
        count.value++

        tl.play()
    }
}