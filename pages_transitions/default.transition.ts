import type { FlowFunction } from "~/waterflow/composables/usePageFlow"

export type defaultTransitionProps = {
    wrapperRef: Ref<HTMLElement>
}



export const defaultFlowOut: FlowFunction<defaultTransitionProps> = async (props, resolve, provider) => {
    const { resetCount, getPromise, getPromiseLeave } = useStoreTransition()
    resetCount()
    const { filterOpen } = useStoreFilter()
    filterOpen.value = false

    await getPromiseLeave()
    resolve()

}
export const fastOut: FlowFunction<defaultTransitionProps> = (props, resolve, provider) => {
    const { resetCount, getPromise } = useStoreTransition()
    resetCount()
    const { filterOpen } = useStoreFilter()
    filterOpen.value = false
    resolve()
}
export const fastProjectsOut: FlowFunction<defaultTransitionProps> = async (props, resolve, provider) => {
    const { resetCount, getPromiseLeave } = useStoreTransition()
    resetCount()
    const { filterOpen } = useStoreFilter()
    filterOpen.value = false

    await getPromiseLeave()
    resolve()
    return
}

export const defaultFlowIn: FlowFunction<defaultTransitionProps> = async ({ wrapperRef }, resolve) => {
    const { resetFilter } = useStoreFilter()
    resetFilter()

    const { resetCount, getPromise } = useStoreTransition()
    await getPromise()

    console.log("RESOVE ==========");
    resolve()
}
export const projectProjectFlowIn: FlowFunction<defaultTransitionProps> = async ({ wrapperRef }, resolve, provider) => {
    const { resetCount, getPromise } = useStoreTransition()
    await getPromise()

    const { breakpoint } = useStoreView()
    if (breakpoint.value == "mobile") {
        // return defaultFlowIn({ wrapperRef }, resolve, provider)
    }
    resolve()
}

export const flowOutMap = new Map([
    ['default', defaultFlowOut],
    ['projects-id => projects-id', defaultFlowOut],
    ['projects-id => projects', defaultFlowOut],
    ['projects => projects-id', defaultFlowOut],
    ['overview => projects', fastOut],
    ['overview => info', fastOut],
])
export const flowInMap = new Map([
    ['default', defaultFlowIn],
    ['projects-id => projects-id', projectProjectFlowIn],
    ['projects => projects-id', projectProjectFlowIn]
])