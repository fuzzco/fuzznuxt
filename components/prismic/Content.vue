<template>
    <div
        class="prismic-content"
        v-if="content && content.length"
        v-html="formattedContent"
    />
</template>

<script>
import linkResolver from '~/libs/prismic/linkResolver'
import PrismicDOM from 'prismic-dom'
import fitvids from 'fitvids'

export default {
    props: {
        content: {
            type: Array,
            default: () => []
        },
        asText: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        formattedContent() {
            return (
                PrismicDOM.RichText[this.asText ? 'asText' : 'asHtml'](
                    this.content,
                    linkResolver
                ) || ''
            )
        }
    },
    async mounted() {
        await this.$nextTick()
        fitvids('div[data-oembed]')
    },
    watch: {
        async content() {
            await this.$nextTick()
            fitvids('div[data-oembed]')
        }
    }
}
</script>
