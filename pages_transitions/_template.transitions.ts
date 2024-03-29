import type { FlowFunction } from "~/waterflow/composables/usePageFlow"

export type TemplateTransitionProps = {
  wrapperRef: Ref<HTMLElement>,
}

const transitionIndexOutDefault: FlowFunction<TemplateTransitionProps> = ({ wrapperRef }, resolve) => {
  resolve()
}

export const templateTransitionOutMap = new Map([
  ['default', transitionIndexOutDefault]
])

const transitionIndexCrossfadeInDefault: FlowFunction<TemplateTransitionProps> = ({ wrapperRef }, resolve) => {
  resolve()
}

export const templateTransitionCrossfadeMap = new Map([
  ['default', transitionIndexCrossfadeInDefault]
])
