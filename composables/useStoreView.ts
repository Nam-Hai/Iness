export const useStoreView = createStore(() => {
	const vh = ref(0);
	const vw = ref(0);
	const scale = ref(0);
	const breakpoint = ref("");


	function init() {

		const ro = useROR((e) => {
			vh.value = e.vh;
			vw.value = e.vw;
			scale.value = e.scale;
			breakpoint.value = e.breakpoint;
		});
		ro.on();
		ro.trigger();
	}


	return {
		vw,
		vh,
		scale,
		breakpoint,
		init,
	};
});
