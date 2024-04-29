
export const useStoreTransition = createStore(() => {
    const count = ref(0)
    const leaveCount = ref(0)

    let resolver = () => { };
    function getResolver() {
        return resolver;
    }
    function resetCount() {
        count.value = 0
        leaveCount.value = 0
        return new Promise<void>((resolve) => {
            resolver = resolve;
        })
    }

    return {
        count,
        leaveCount,
        resetCount,
        getResolver
    }
})