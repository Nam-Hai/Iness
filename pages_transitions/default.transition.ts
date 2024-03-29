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
        d: 200,
        e: "io3",
        update: (t) => {

        },
        cb() {
            // resolve()
        },
    }).play()
    resolve()
}

export const defaultFlowIn: FlowFunction<defaultTransitionProps> = ({ wrapperRef }, resolve,) => {
    useDelay(1000, () => {
        resolve()
    })
    // resolve()
}
export const projectProjectFlowIn: FlowFunction<defaultTransitionProps> = async ({ wrapperRef }, resolve, provider) => {
    const { breakpoint } = useStoreView()
    if (breakpoint.value == "mobile") {
        // return defaultFlowIn({ wrapperRef }, resolve, provider)
    }
    useDelay(500, () => {
        resolve()
    })
}

export const flowOutMap = new Map([
    ['default', defaultFlowOut],
])
export const flowInMap = new Map([
    ['default', defaultFlowIn],
    ['projects-id => projects-id', projectProjectFlowIn],
    ['projects => projects-id', projectProjectFlowIn]
])