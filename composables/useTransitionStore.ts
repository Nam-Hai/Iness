
export const useStoreTransition = createStore(() => {
    const count = ref(0)
    const leaveCount = ref(0)

    let resolver = () => { };
    let resolverLeave = () => { };
    function getResolver() {
        return resolver;
    }
    function getResolverLeave() {
        return resolverLeave;
    }
    function getCount() {
        return count.value
    }
    let promise: Promise<void>;
    let promiseLeave: Promise<void>;

    function getPromiseLeave() {
        return promiseLeave
    }
    function getPromise() {
        return promise
    }
    function resetCount() {
        count.value = 0
        leaveCount.value = 0
        promise = new Promise<void>((resolve) => {
            resolver = resolve;
        })
        promiseLeave = new Promise<void>((res) => {
            resolverLeave = res
        })
    }

    return {
        count,
        leaveCount,
        resetCount,
        getResolver,
        getCount,
        getPromise,
        getPromiseLeave,
        getResolverLeave
    }
})