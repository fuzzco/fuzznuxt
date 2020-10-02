import throttle from 'lodash/throttle'

export default {
    data() {
        return {
            clientRect: null,
            rectThrottle: 150
        }
    },
    mounted() {
        window.addEventListener(
            'scroll',
            throttle(this.setRect, this.rectThrottle)
        )
        window.addEventListener(
            'resize',
            throttle(this.setRect, this.rectThrottle)
        )
        this.$nextTick(this.setRect)
    },
    methods: {
        setRect() {
            if (this.$el && this.$el.getBoundingClientRect)
                this.clientRect = this.$el.getBoundingClientRect()
        }
    }
}
