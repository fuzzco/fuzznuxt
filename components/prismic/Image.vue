<template>
    <component :is="wrapper" :style="cmpStyle" class="prismic-image">
        <img class="media" :src="src" v-if="loadMedia || loadImmediately" />
    </component>
</template>

<script>
export default {
    props: {
        wrapper: {
            type: String,
            default: 'figure'
        },
        src: {
            type: String,
            default: ''
        },
        aspect: {
            type: Number,
            default: 56.25
        },
        loadImmediately: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            loadMedia: false,
            observer: null
        }
    },
    mounted() {
        // if we're loading immediately, ignore
        if (this.loadImmediately) {
            return
        }

        // create a global observer if we don't have one
        if (!window.prismicImageObserver) {
            window.prismicImageObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view')
                    } else {
                        entry.target.classList.remove('in-view')
                    }
                })
            })
        }
        // attach to the observer
        this.observer = window.prismicImageObserver
        this.observer.observe(this.$el)
    },
    computed: {
        cmpStyle() {
            return {
                '--aspect-ratio': `${this.aspect}%`
            }
        }
    }
}
</script>

<style lang="scss">
.prismic-image {
    width: 100%;
    height: 0;
    padding-bottom: var(--aspect-ratio);
    position: relative;

    .media {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        object-fit: cover;
    }
}
figure.prismic-image {
    margin: 0;
}
</style>
