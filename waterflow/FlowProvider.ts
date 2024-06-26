import { type RouteLocationNormalized, useRoute } from 'vue-router';
import { type DefineComponent, type Ref, type ShallowRef, nextTick, ref } from 'vue';
import { createContext } from './util/apiInject';

export type FlowProps = Record<string, any>

const preventScroll = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

export class FlowProvider {
  // public transitionOut!: Promise<void>;
  public flowHijacked!: Promise<void>;
  private flowHijackResolver?: () => void;
  private routeTo!: RouteLocationNormalized;
  private routeFrom!: RouteLocationNormalized;
  flowSwapping = ref(false)

  // bufferRouteState?: ShallowRef;
  bufferTopZState?: ShallowRef;
  bufferPageRef!: ShallowRef;
  currentPageRef!: ShallowRef;

  props: FlowProps = {}

  routerMap: Map<string, DefineComponent<{}, {}, any>>
  scrollFlow = {
    stop: () => {
      document.addEventListener('wheel', preventScroll, { passive: false });
    },
    resume: () => {
      document.removeEventListener('wheel', preventScroll);
    },
    scrollToTop: () => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    resize: () => {

    }
  }
  swapWrapper!: () => void;
  flowIsHijacked = ref(true)
  routeRef: Ref<RouteLocationNormalized>;

  constructor() {
    const route = useRoute()
    this.routeTo = route
    this.routeFrom = route
    this.routeRef = ref(route)

    this.routerMap = new Map()
  }

  registerPage(path: string, pageComponent: DefineComponent<{}, {}, any>) {
    this.routerMap.set(path, pageComponent)
  }

  registerScrollInterface(api: { stop?: () => void, resume?: () => void, scrollToTop?: () => void, resize?: () => void } | undefined) {
    if (!api) return
    api.stop && (this.scrollFlow.stop = api.stop);
    api.resume && (this.scrollFlow.resume = api.resume)
    api.scrollToTop && (this.scrollFlow.scrollToTop = api.scrollToTop);
    api.resize && (this.scrollFlow.resize = api.resize);
  }

  // connect the BufferPage in the Layout for crossfade animations
  public connectBuffer(currentPageRef: ShallowRef, bufferPageRef: ShallowRef, bufferTopZState: ShallowRef, swapWrapper: () => void) {
    this.bufferTopZState = bufferTopZState
    this.bufferPageRef = bufferPageRef
    this.currentPageRef = currentPageRef
    this.swapWrapper = swapWrapper
    // this.currentPageRef.value = this.routeFrom.
    // console.log(this.routeTo, this.routeTo.name?.toString());
    const to = this.routeTo.name?.toString()
    this.currentPageRef.value = this.routerMap.get(to || "index")
  }

  // to add global props, like layout component or a webGL context
  public addProps(key: string, prop: Ref<any>) {
    if (!this.props[key]) {
      this.props[key] = prop
    }
  }

  public unMountBufferPage() {
    // this.bufferRouteState && (this.bufferRouteState.value = undefined)
    this.swapWrapper()
    let temp = this.currentPageRef

    this.currentPageRef = this.bufferPageRef
    this.bufferPageRef = temp
    this.bufferPageRef.value = undefined
    this.bufferTopZState && (this.bufferTopZState.value = false)

    this.flowSwapping.value = false
  }

  public onChangeRoute(routeTo: RouteLocationNormalized) {
    this.routeFrom = this.routeTo
    this.routeTo = routeTo
    this.routeRef.value = routeTo

    this.bufferPageRef.value = this.routerMap.get(this.routeTo.name!.toString())
  }

  public setCrossfadeMode(crossfadeMode: boolean | 'TOP' | 'UNDER' | 'BOTTOM') {
    // this.bufferRouteState && (this.bufferRouteState.value = this.routerMap.get(this.routeTo.name!.toString()));

    // if (!!this.bufferRouteState?.value) {
    this.bufferTopZState && (this.bufferTopZState.value = crossfadeMode == 'TOP')
    // }

    // let a = !(crossfadeMode == false) && !!this.bufferRouteState?.value
    // return a
  }

  public getRouteFrom(): RouteLocationNormalized {
    return this.routeFrom;
  }

  public getRouteTo(): RouteLocationNormalized {
    return this.routeTo;
  }

  public releaseHijackFlow(): void {
    if (this.flowHijackResolver) {
      this.flowHijackResolver();
      this.flowIsHijacked.value = false
      this.flowHijackResolver = undefined
    }
  }

  public hijackFlow() {
    this.flowSwapping.value = true
    this.flowIsHijacked.value = true
    this.flowHijacked = new Promise<void>((resolve) => {
      this.flowHijackResolver = resolve;
    });
    return this.flowHijacked
  }
}
export const [provideFlowProvider, useFlowProvider] = (() => {
  let flowProvider: FlowProvider;
  const provider = () => {
    flowProvider = new FlowProvider()
  }
  const inject = () => {
    return flowProvider
  }

  return [provider, inject]
})()

// export const [provideFlowProvider, useFlowProvider] = createContext<FlowProvider>('flow-provider');
