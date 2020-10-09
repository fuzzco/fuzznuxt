<template>
    <component
        :is="wrapper"
        class="prismic-content"
        v-if="content && content.length"
        v-html="formattedContent"
    />
</template>

<script>
import { RichText } from 'prismic-dom'
import linkResolver from '~/libs/prismic/linkResolver'
import defaultHtmlSerializer from '~/libs/prismic/htmlSerializer'
// import fitvids from 'fitvids'

export default {
    props: {
        content: {
            type: Array,
            default: () => []
        },
        asText: {
            type: Boolean,
            default: false
        },
        wrapper: {
            type: String,
            default: 'div'
        },
        htmlSerializer: {
            type: Function,
            default: null
        }
    },
    computed: {
        formattedContent() {
            return (
                RichText[this.asText ? 'asText' : 'asHtml'](
                    this.content,
                    linkResolver,
                    this.htmlSerializer || defaultHtmlSerializer
                ) || ''
            )
        }
    },
    async mounted() {
        await this.$nextTick()
        // fitvids('div[data-oembed]')
    },
    watch: {
        async content() {
            await this.$nextTick()
            // fitvids('div[data-oembed]')
        }
    }
}
</script>
