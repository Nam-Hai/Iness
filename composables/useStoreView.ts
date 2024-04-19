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
	const dimension = ref(100)
	let virtualScroll = 0
	const { vh } = useStoreView()

	const container: Ref<Element | undefined> = ref()

	let ticking = false
	function init() {
		const app = N.get("#app")!
		container.value = app
		useRafR(({ delta, elapsed }) => {
			if (!ticking) return
			if (container.value) {
				scroll.value = virtualScroll
				if (container.value.scrollTop != scroll.value) {
					container.value.scrollTop = scroll.value
				}
			}

			for (let index = scrollItem.length - 1; index >= 0; index--) {
				scrollItem[index].callback(scroll.value)
			}

			ticking = false
		}, RafPriority.FIRST).run()

		window.addEventListener("wheel", (e) => {
			const delta = e.deltaY
			virtualScroll += delta
			virtualScroll = N.Clamp(virtualScroll, 0, dimension.value)
			ticking = true
		})

		let start = 0
		let scrollStart = 0

		window.addEventListener("touchstart", (e) => {
			const y = e.touches[0].clientY
			start = y
			scrollStart = virtualScroll
		})
		window.addEventListener("touchmove", (e) => {
			const y = e.touches[0].clientY
			const delta = y - start
			console.log(delta);
			virtualScroll = scrollStart - delta
			virtualScroll = N.Clamp(virtualScroll, 0, dimension.value)
			ticking = true
		})

		const ro = useROR((e) => {
			if (!container.value) return
			dimension.value = container.value.scrollHeight - vh.value
			ticking = true
		});
		ro.on();
	}

	function resize() {
		if (!container.value) return
		dimension.value = container.value.scrollHeight - vh.value
		ticking = true
	}
	function scrollToTop() {
		scroll.value = 0
		virtualScroll = 0
		if (container.value) container.value.scrollTop = 0
		ticking = true
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
		resize,
		emit,
		container,
		onScroll,
		scrollToTop
	}
})