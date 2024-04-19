import Lenis from "@studio-freight/lenis";
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

// export const useStoreScroll = createStore(() => {
// 	const scroll = ref(0)
// 	const dimension = ref(100)
// 	let virtualScroll = 0
// 	const { vh } = useStoreView()

// 	const container: Ref<Element | undefined> = ref()

// 	let ticking = false
// 	function init() {
// 		const app = N.get("#app")!
// 		container.value = app
// 		useRafR(({ delta, elapsed }) => {
// 			if (!ticking) return
// 			if (container.value) {
// 				// if (container.value.scrollTop != scroll.value) {
// 				if (ticking) {
// 					// container.value.scrollTop = virtualScroll
// 				}
// 				virtualScroll = container.value.scrollTop
// 				scroll.value = virtualScroll

// 			}

// 			ticking = false

// 		}, RafPriority.FIRST).run()

// 		document.body.addEventListener("scroll", ()=>{
// 			console.log('test');
// 			ticking = true
// 		})
// 		app.addEventListener("scroll", (e) => {
// 			// ticking = true
// 		})

// 		const ro = useROR((e) => {
// 			if (!container.value) return
// 			dimension.value = container.value.scrollHeight - vh.value
// 			ticking = true
// 		});
// 		ro.on();
// 	}

// 	function resize() {
// 		if (!container.value) return
// 		dimension.value = container.value.scrollHeight - vh.value
// 		ticking = true
// 	}
// 	function scrollToTop() {
// 		scroll.value = 0
// 		virtualScroll = 0
// 		if (container.value) container.value.scrollTop = 0
// 		ticking = true
// 	}

// 	let scrollID = 0
// 	const scrollItem: { id: number, callback: (scroll: number) => void }[] = []
// 	function onScroll(callback: (scroll: number) => void) {
// 		const id = scrollID++
// 		scrollItem.push({ id, callback })

// 		return () => remove(id)
// 	}
// 	function remove(id: number) {
// 		const i = binarySearch(scrollItem, id)
// 		if (i == -1) {
// 			console.warn("Raf remove jammed")
// 			return
// 		}
// 		scrollItem.splice(i, 1)
// 	}

// 	watch(scroll, (s) => {
// 		for (let index = scrollItem.length - 1; index >= 0; index--) {
// 			scrollItem[index].callback(s)
// 		}
// 	})

// 	function emit() {
// 		ticking = true
// 	}

// 	return {
// 		init,
// 		scroll,
// 		resize,
// 		emit,
// 		container,
// 		onScroll,
// 		scrollToTop
// 	}
// })

export const useStoreScroll = createStore(() => {
	const lenis = ref() as Ref<Lenis>
	const scroll = ref(0)
	function init() {
		lenis.value = new Lenis({
			normalizeWheel: true,
			smoothTouch: false,
			syncTouch: true,
			touchInertiaMultiplier: 20,
			wheelMultiplier: 1,
			touchMultiplier: 1,
		})
		lenis.value.start()

		const raf = useRafR(({ elapsed }) => {
			lenis.value.raf(elapsed)
		}).run()

		lenis.value.on("scroll", (e: any) => {
			scroll.value = e.animatedScroll
		})
	}

	function resize() {
		console.trace(lenis.value);
		lenis.value.resize()
	}
	function emit() {
		lenis.value.emit()
	}

	function onScroll(callback: (scroll: number) => void) {
		lenis.value.on("scroll", (e: any) => callback(e.animatedScroll))
	}
	function scrollToTop() {
		lenis.value.scrollTo("top")
	}
	return {
		init,
		scroll,
		resize,
		emit,
		onScroll,
		scrollToTop
	}
})