import { RafPriority, binarySearch } from "~/plugins/core/raf";

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

export const useStoreScroll = createStore(() => {
	const scroll = ref(0)


	let ticking = false
	function init() {
		useRafR(({ delta, elapsed }) => {
			if (!ticking) return
			scroll.value = window.scrollY

			for (let index = scrollItem.length - 1; index >= 0; index--) {
				scrollItem[index].callback(scroll.value)
			}

			ticking = false
		}, RafPriority.FIRST).run()

		document.addEventListener("scroll", (e: Event) => {
			ticking = true
		})

		const ro = useROR((e) => {
			ticking = true
		});
		ro.on();
	}

	let scrollID = 0
	const scrollItem: { id: number, callback: (scroll: number) => void }[] = []
	function onScroll(callback: (scroll: number) => void) {
		const id = scrollID++
		scrollItem.push({ id, callback })

		return () => remove(id)
	}
	function remove(id: number) {
		const i = binarySearch(scrollItem, id)
		if (i == -1) {
			console.warn("Raf remove jammed")
			return
		}
		scrollItem.splice(i, 1)
	}

	function emit() {
		ticking = true
	}

	return {
		init,
		scroll,
		emit,
		onScroll
	}
})