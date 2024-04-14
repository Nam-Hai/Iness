const map = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\h\|()1{}[]?-_+~<>i!lI;:,^'."
const STAGGER_MS = 25
const SPEED_MS = 5
const test = 150

export function useStreamingText(elRef: Ref<HTMLElement>) {

    const tl = useTL()

    onMounted(() => {
        const el = elRef.value
        const text = elRef.value.innerText
        console.log(elRef.value, text);
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
                delay: N.Ease.o2(Math.min(index, test) / test) * test * SPEED_MS,
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
                delay: N.Ease.o2(Math.min(index, test) / test) * test * SPEED_MS,
                cb() {
                    span.innerText = letter
                },
            })
        }

    })

    function trigger() {

        tl.play()
    }

    return { trigger }
}
