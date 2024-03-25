import Lenis from "@studio-freight/lenis";

export const useStoreView = createStore(() => {
	const vh = ref(0);
	const vw = ref(0);
	const scale = ref(0);
	const breakpoint = ref("");

	const lenis = ref() as Ref<Lenis>

	function init() {

		const ro = useROR((e) => {
			vh.value = e.vh;
			vw.value = e.vw;
			scale.value = e.scale;
			breakpoint.value = e.breakpoint;
		});
		ro.on();
		ro.trigger();

		lenis.value = new Lenis({
			normalizeWheel: true,
			smoothTouch: false,
			syncTouch: true,
			wheelMultiplier: 0.82,
			touchMultiplier: 1.7,
		})
	}


	return {
		vw,
		vh,
		scale,
		breakpoint,
		init,
		lenis
	};
});
