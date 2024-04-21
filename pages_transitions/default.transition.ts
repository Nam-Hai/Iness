import type { FlowFunction } from "~/waterflow/composables/usePageFlow"

export type defaultTransitionProps = {
    wrapperRef: Ref<HTMLElement>
}



export const defaultFlowOut: FlowFunction<defaultTransitionProps> = (props, resolve, provider) => {
    const { filterOpen } = useStoreFilter()
    filterOpen.value = false
    useDelay(2000, () => {
        resolve()
    })
}
export const fastOut: FlowFunction<defaultTransitionProps> = (props, resolve, provider) => {
    const { filterOpen } = useStoreFilter()
    filterOpen.value = false
    resolve()
}

export const defaultFlowIn: FlowFunction<defaultTransitionProps> = ({ wrapperRef }, resolve,) => {
    const { resetFilter } = useStoreFilter()
    resetFilter()
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
    resolve()
    useDelay(1000, () => {
        // resolve()
    })
}

export const flowOutMap = new Map([
    ['default', defaultFlowOut],
    ['projects-id => projects-id', fastOut],
    ['overview => projects', fastOut],
    ['overview => info', fastOut],
])
export const flowInMap = new Map([
    ['default', defaultFlowIn],
    ['projects-id => projects-id', projectProjectFlowIn],
    ['projects => projects-id', projectProjectFlowIn]
])