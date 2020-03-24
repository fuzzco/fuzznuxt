export default {
    data() {
        return {
            intersectionObservers: [],
            teardownObservers: true
        }
    },
    methods: {
        observe(
            target,
            callback,
            { root = null, sample = 0.01, options = {} } = {}
        ) {
            // build our threshold array
            const sampleCount = Math.floor(1 / sample)
            const threshold = Array(sampleCount)
                .fill()
                .map((v, i) => i * sample)

            // make sure threshold array includes 1
            if (!threshold.includes(1)) {
                threshold.push(1)
            }

            // build observer
            const observer = new IntersectionObserver(callback, {
                root,
                threshold,
                ...options
            })

            // start observing
            observer.observe(target)

            // save observer
            this.intersectionObservers.push(observer)
        },
        runObserverTeardown() {
            this.intersectionObservers.forEach(obs => {
                if (obs) {
                    obs.disconnect()
                }
            })
        }
    },
    beforeDestroy() {
        if (this.teardownObservers) {
            this.runObserverTeardown()
        }
    }
}
