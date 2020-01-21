<template>
    <component
        :class="['prismic-image', { 'fill-space': fillSpace }, `fit-${fit}`]"
        :is="wrapper"
        :style="{ '--aspect': cmpAspect + '%' }"
    >
        <component class="image-sizer" :is="innerWrapper">
            <!-- 2x2 version of image stretched to full size -->
            <img
                class="loader"
                :src="tinyUrl"
                :width="cmpWidth"
                :height="cmpHeight"
                aria-hidden="true"
                v-if="!hidePreview"
            />
            <transition :name="transition">
                <img
                    :src="cmpUrl"
                    :srcset="cmpSrcset"
                    :width="cmpWidth"
                    :height="cmpHeight"
                    :alt="alt"
                    v-show="loaded"
                    ref="mainImage"
                    key="main-image"
                    class="media"
                />
            </transition>
        </component>
    </component>
</template>

<script>
const defaultSizes = [null, 1920, 1100, 800, 500]

export default {
    props: {
        wrapper: {
            type: String,
            default: 'div'
        },
        src: {
            type: String,
            default: ''
        },
        aspect: {
            type: [String, Number],
            default: -1
        },
        innerWrapper: {
            type: String,
            default: 'div'
        },
        sizes: {
            type: Array,
            default: () => defaultSizes
        },
        transition: {
            type: String,
            default: 'fade'
        },
        hidePreview: {
            type: Boolean,
            default: false
        },
        fillSpace: {
            type: Boolean,
            default: false
        },
        fit: {
            type: String,
            default: 'cover'
        },
        // props from Prismic
        dimensions: {
            type: Object,
            default: { width: -1, height: -1 }
        },
        alt: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        }
        // end props from Prismic
    },
    data() {
        return {
            loaded: false
        }
    },
    async mounted() {
        await this.$nextTick()
        const img = this.$refs.mainImage
        if (img.complete) {
            this.loaded = true
        } else {
            img.addEventListener('load', () => (this.loaded = true))
        }
    },
    computed: {
        cmpUrl() {
            return this.url || this.src
        },
        cmpWidth() {
            return this.dimensions.width
        },
        cmpHeight() {
            return this.dimensions.height
        },
        cmpAspect() {
            // calculate if no aspect provided
            if (this.aspect === -1) {
                return (this.dimensions.height / this.dimensions.width) * 100
            }

            // otherwise, parse provided aspect, handling both 56.25 and 0.5625 style
            const toParse = parseFloat(this.aspect)
            return toParse <= 1 ? toParse * 100 : toParse
        },
        cmpSrcset() {
            return this.sizes
                .map(size => {
                    const width = size === null ? this.cmpWidth : size
                    const height = Math.round(width / (this.cmpAspect / 100))
                    return this.cmpUrl + `&w=${width}&h=${height} ${width}w`
                })
                .join(', ')
        },
        tinyUrl() {
            return this.cmpUrl + `&w=2&h=2`
        }
    }
}
</script>

<style lang="scss">
.prismic-image {
    position: relative;
    width: 100%;

    .image-sizer {
        overflow: hidden;
        padding-bottom: var(--aspect);

        & > * {
            position: absolute;
            height: 100%;
            width: 100%;
            left: 0;
            top: 0;
        }
    }

    // fill space
    &.fill-space {
        height: 100%;

        .image-sizer {
            padding-bottom: 0;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
    }

    // fits
    &.fit-cover .image-sizer > * {
        object-fit: cover;
    }
    &.fit-contain .image-sizer > * {
        object-fit: contain;
    }
}
</style>
