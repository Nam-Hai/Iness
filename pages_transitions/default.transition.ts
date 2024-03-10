import type { FlowFunction } from "~/waterflow/composables/usePageFlow"

export type defaultTransitionProps = {
    wrapperRef: Ref<HTMLElement>
}

export const defaultFlowOut: FlowFunction<defaultTransitionProps> = (props, resolve, provider) => {
    const tl = useTL()

    tl.from({
        el: props.wrapperRef.value,
        d: 1000,
        e: "io3",
        p: {
            x: [0, 20, 'rem']
        },
        cb() {
            resolve()
        },
    }).play()
    // resolve()
}

export const defaultFlowIn: FlowFunction<defaultTransitionProps> = ({ wrapperRef }, resolve,) => {
    resolve()
}

export const flowOutMap = new Map([
    ['default', defaultFlowOut],
])