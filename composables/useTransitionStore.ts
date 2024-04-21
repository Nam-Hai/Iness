
export const useStoreTransition = createStore(() => {
    const count = ref(0)
    const leaveCount = ref(0)

    function resetCount() {
        count.value = 0
        leaveCount.value = 0
    }

    return {
        count,
        leaveCount,
        resetCount
    }
})