import { onMounted, onUnmounted } from "vue";
import { type FlowProps, FlowProvider, useFlowProvider } from "../FlowProvider";
import { useRouter } from "vue-router";
import type { RouteLocationNormalized } from "#vue-router";

export type FlowFunction<T> = (props: T, resolve: () => void, provider: FlowProvider, options?: any) => void

// TODO cancel animation if a new route is taken early
type PageFlowOptions<T> = {
  props: T,
  flowOut?: FlowFunction<T>,
  flowOutMap?: Map<string, FlowFunction<T>>,
  flowInCrossfade?: FlowFunction<T>,
  flowInCrossfadeMap?: Map<string, FlowFunction<T>>,

  // should probably not use this yet, if you click on a link in the buffer things break
  disablePointerEvent?: boolean,

  // true && 'BOTTOM' are the same
  enableCrossfade?: false | true | 'TOP' | 'BOTTOM'
}

export function usePageFlow<T>({
  props,
  flowOutMap,
  flowOut,
  flowInCrossfade,
  flowInCrossfadeMap,
  enableCrossfade = false,
  disablePointerEvent = true
}: PageFlowOptions<T>) {
  const provider = useFlowProvider();
  let crossfade = enableCrossfade;

  const flowProps = provider.props

  onMounted(() => {
    provider.flowIsHijacked.value && flowCrossfade()
  })


  const flowCrossfade = async () => {
    await createFlow<T>(provider, flowInCrossfadeMap, flowInCrossfade, props)
    provider.releaseHijackFlow()
  }

  const router = useRouter()
  const routerGuard = router.beforeEach(async (to, from, next) => {
    provider.scrollFlow.stop()
    // await transitionExecption(provider, to, from)
    // scrollLenis.value = 0

    // if (disablePointerEvent) {
    N.Class.add(document.body, 'flowIsHijacked')
    // }


    let flowInPromise = crossfade ? provider.hijackFlow() : null
    // mount next page

    crossfade && provider.setCrossfadeMode(crossfade)

    let promiseOut = createFlow<T>(provider, flowOutMap, flowOut, props)
    provider.onChangeRoute(to)

    await Promise.all([promiseOut, flowInPromise])
    // swap buffer
    provider.unMountBufferPage()

    provider.scrollFlow.resize()
    provider.scrollFlow.resume()
    provider.scrollFlow.scrollToTop()


    if (disablePointerEvent) {
      N.Class.remove(document.body, 'flowIsHijacked')
    }

    next()
  })


  onUnmounted(() => {
    routerGuard()
  })
}

function createFlow<T>(provider: FlowProvider, flowMap: Map<string, FlowFunction<T>> | undefined, flow: FlowFunction<T> | undefined, props: T): Promise<void> {
  const from = provider.getRouteFrom();
  const to = provider.getRouteTo();

  const key: string = from.name?.toString() + ' => ' + to.name?.toString()


  let FlowFunction = getFlowFunction(key, flowMap, flow)
  return new Promise<void>(cb => {
    if (!FlowFunction) cb()
    else FlowFunction(props, cb, provider)
  })
}

// getter for FlowFunction between the Map, and fallback function
function getFlowFunction<T>(key: string, map?: Map<string, FlowFunction<T>>, fallback?: FlowFunction<T>) {
  return map?.get(key) || map?.get('default') || fallback || undefined
}


async function transitionExecption(provider: FlowProvider, to: RouteLocationNormalized, from: RouteLocationNormalized) {
  if (true) {

    await new Promise<void>(res => {
      res()
    })
  }

}