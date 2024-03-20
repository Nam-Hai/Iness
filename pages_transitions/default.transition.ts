import type { FlowFunction } from "~/waterflow/composables/usePageFlow"

export type defaultTransitionProps = {
    wrapperRef: Ref<HTMLElement>
}

export const indexFlowOut: FlowFunction<defaultTransitionProps> = (props, resolve, provider) => {
    const tl = useTL()

    tl.from({
        d: 1000,
        e: "io3",
        update: (t) => {

        },
        cb() {
            resolve()
        },
    }).play()
    // resolve()
}
export const defaultFlowOut: FlowFunction<defaultTransitionProps> = (props, resolve, provider) => {
    const tl = useTL()

    tl.from({
        d: 1000,
        e: "io3",
        update: (t) => {

        },
        cb() {
            resolve()
        },
    }).play()
}

export const defaultFlowIn: FlowFunction<defaultTransitionProps> = ({ wrapperRef }, resolve,) => {
    useDelay(1000, () => {
        resolve()
    })
    // resolve()
}
export const projectProjectFlowIn: FlowFunction<defaultTransitionProps> = async ({ wrapperRef }, resolve,) => {
    const { placeholderPos, placeholderPosFrom, bounds } = useStoreProjectImage()
    const from = placeholderPosFrom.value
    const placeholderDOM = N.get("#project-image__placeholder", wrapperRef.value) as HTMLElement | null
    console.log(from);
    if (!placeholderDOM) return resolve()

    const boundsTo = bounds.value[0]

    N.O(placeholderDOM, 0)
    placeholderDOM.style.transform = `translate(${from.x}px, ${from.y}px) scale(${from.width / 100}, ${from.height / 100})`

    const motion = useMotion({
        d: 600,
        e: 'io3',
        delay: 180,
        update({ prog, progE }) {
            const x = N.Lerp(from.x, boundsTo.x, progE)
            const y = N.Lerp(from.y, boundsTo.y, progE)
            const w = N.Lerp(from.width, boundsTo.width, progE)
            const h = N.Lerp(from.height, boundsTo.height, progE)
            placeholderPos.x = x
            placeholderPos.y = y
            placeholderPos.w = w
            placeholderPos.h = h
            placeholderDOM.style.transform = `translate(${x}px, ${y}px) scale(${w / 100}, ${h / 100})`

        },
        cb() {
            resolve()
        },
    });
    motion.play()
    await nextTick()
    N.O(placeholderDOM, 1)
}

export const flowOutMap = new Map([
    ['default', defaultFlowOut],
])
export const flowInMap = new Map([
    ['default', defaultFlowIn],
    ['projects-id => projects-id', projectProjectFlowIn],
    ['projects => projects-id', projectProjectFlowIn]
])