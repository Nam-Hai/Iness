const map = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\h\|()1{}[]?-_+~<>i!lI;:,^'."
const STAGGER_MS = 20
const SPEED_MS = 250
const wordMax = 30

export function useStreamingText(elRef: Ref<HTMLElement>, options: { breakpoint: boolean } = { breakpoint: false }) {
    const tl = useTL()

    onMounted(() => {
        computeTimeline()
    })
    if (options.breakpoint) {
        const { breakpoint } = useStoreView()
        watch(breakpoint, async () => {
            await nextTick()
            computeTimeline()
        })
    }
    function computeTimeline() {
        tl.reset()
        const el = elRef.value
        if (!el) return
        const text = elRef.value.innerText
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

        tl.from({
            d: 0,
            update() {

            },
            cb() {
                for (const span of spans) {
                    N.O(span, 0)
                }
            },
        })

        const wordLength = char.length
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
                delay: N.Ease.linear(Math.min(index, wordLength) / wordLength) * 1 * SPEED_MS,
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
                delay: N.Ease.linear(Math.min(index, wordLength) / wordLength) * 1 * SPEED_MS,
                cb() {
                    span.innerText = letter
                },
            })
        }


    }

    function trigger() {
        tl.pause()
        tl.play()
    }

    return { trigger, computeTimeline }
}

export function useLeaveText(elRef: Ref<HTMLElement>) {
    const tl = useTL()

    onMounted(() => {
        // computeTimeline(elRef.value)
    })
    // function computeTimeline() {
    // }

    function trigger() {
        tl.reset()
        const wordMax = 30
        const el = elRef.value
        const text = el.innerText
        const char = text.split('')

        const wordLength = char.length
        const ratio = Math.min(wordMax, wordLength) / wordMax
        const spans = N.getAll('span', el)
        for (let index = 0; index < spans.length; index++) {
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
                    if (span) {
                        span.innerText = letter
                    }
                },
            })
        }
        // tl.from({
        //     update({ prog, progE }) {
        //     },
        //     d: 0,
        //     delay: SPEED_MS + 220,
        //     cb() {
        //         for (const span of (spans as unknown as HTMLElement[])) {
        //             N.O(span, 0)
        //         }
        //     },
        // })
        tl.play()
    }
    return {
        trigger,
        computeTimeline
    }
}

export function computeTimeline(el: HTMLElement) {
    const tl = useTL()
    tl.reset()
    let text = el.innerText
    let char = text.split('')
    let spans: HTMLElement[] = []
    function compute() {
        text = el.innerText
        char = text.split('')
        el.innerHTML = ""
        spans = []

        for (const c of char) {
            const span = N.Cr('span')
            spans.push(span)
            span.innerText = c
            N.O(span, 0)
            el.appendChild(span)
        }

        tl.from({
            d: 0,
            update() {

            },
            cb() {
                for (const span of spans) {
                    N.O(span, 0)
                }
            },
        })
        const wordLength = char.length
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
                delay: N.Ease.linear(Math.min(index, wordLength) / wordLength) * 1 * SPEED_MS,
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
                delay: N.Ease.linear(Math.min(index, wordLength) / wordLength) * 1 * SPEED_MS,
                cb() {
                    span.innerText = letter
                },
            })
        }
    }
    compute()



    function trigger() {
        tl.pause()
        tl.play()
    }
    return {
        trigger,
        compute
    }
}