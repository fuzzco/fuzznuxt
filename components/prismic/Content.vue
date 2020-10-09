<template>
    <div
        class="prismic-content"
        v-if="content && content.length"
        v-html="formattedContent"
    />
</template>

<script>
// NOTE:
// This will not handle relative links in body content correctly.
// For that to work, switch `prismic-content` to `prismic-content-full`.
// See `~/components/prismic/ContentFull.vue` for more info.

import linkResolver from '~/libs/prismic/linkResolver'
import { RichText } from 'prismic-dom'
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
                this.$prismic[this.asText ? 'asText' : 'asHtml'](
                    this.content
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
