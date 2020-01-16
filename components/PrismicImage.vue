<template>
    <component
        class="prismic-image"
        :is="wrapper"
        :style="{ '--aspect': cmpAspect + '%' }"
    >
        <component class="image-sizer" :is="innerWrapper">
            <img
                :src="cmpUrl"
                :width="cmpWidth"
                :height="cmpHeight"
                :alt="alt"
            />
        </component>
    </component>
</template>

<script>
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
            object-fit: cover;
            height: 100%;
            width: 100%;
            left: 0;
            top: 0;
        }
    }
}
</style>
