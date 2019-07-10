let listener

export default {
    data() {
        return {
            index: 0,
            interval: 5000,
            autoplayMethod: null,
            goingForward: false,
            hammer: null
        }
    },
    async mounted() {
        this.autoplayMethod = setInterval(() => this.next(false), this.interval)

        listener = evt => {
            if (evt.keyCode == 39) this.next()
            if (evt.keyCode == 37) this.prev()
        }

        window.addEventListener('keydown', listener)

        await this.$nextTick()

        const Hammer = require('hammerjs')
        this.hammer = new Hammer(this.$el)
        this.hammer.on('swipeleft', evt => this.next())
        this.hammer.on('swiperight', evt => this.prev())
    },
    beforeDestroy() {
        window.removeEventListener('keydown', listener)
    },
    methods: {
        next(stopAuto = true) {
            if (stopAuto) {
                this.stopAuto()
            }
            this.index++
            this.goingForward = true
        },
        prev(stopAuto = true) {
            if (stopAuto) {
                this.stopAuto()
            }
            this.index--
            this.goingForward = false
        },
        goToIndex(index, stopAuto = true) {
            const oldIndex = this.index
            this.index = index
            this.goingForward = index > oldIndex

            if (stopAuto) this.stopAuto()
        },
        stopAuto() {
            clearInterval(this.autoplayMethod)
            this.autoplayMethod = null
        }
    },
    watch: {
        index(newVal) {
            if (!this.slides || !this.slides.length) return

            if (newVal < 0) {
                this.index = this.slides.length + newVal
            } else if (newVal >= this.slides.length) {
                this.index = this.slides.length % newVal
            }
        }
    }
}
