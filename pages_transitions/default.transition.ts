import type { FlowFunction } from "~/waterflow/composables/usePageFlow"

export type defaultTransitionProps = {
    wrapperRef: Ref<HTMLElement>
}

export const defaultFlowOut: FlowFunction<defaultTransitionProps> = (props, resolve, provider) => {
    const tl = useTL()

    resolve()
}

export const defaultFlowIn: FlowFunction<defaultTransitionProps> = ({ wrapperRef }, resolve,) => {
    resolve()
}

export const flowOutMap = new Map([
    ['default', defaultFlowOut],
])