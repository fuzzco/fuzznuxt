export default {
    data() {
        return {
            hovering: false
        }
    },
    mounted() {
        this.$el.addEventListener('mouseenter', this.onHoverStart)
        this.$el.addEventListener('mouseleave', this.onHoverStop)
    },
    beforeDestroy() {
        this.$el.removeEventListener('mouseenter', this.onHoverStart)
        this.$el.removeEventListener('mouseleave', this.onHoverStop)
    },
    methods: {
        onHoverStart() {
            if (!this.$store.getters['browser/isMobile']) {
                this.hovering = true
            }
        },
        onHoverStop() {
            if (!this.$store.getters['browser/isMobile']) {
                this.hovering = false
            }
        }
    }
}
