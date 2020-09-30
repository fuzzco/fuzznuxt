<template>
    <component class="prismic-content" :is="wrapper">
        <v-runtime-template :template="formattedContent" />
    </component>
</template>

<script>
// NOTE:
// You need to include the full Vue build for this to work properly -
// see nuxt.config.js > universal.build.extend for more info!
//
// You'll also need to register this component globally -
// see ~/plugins/browser.js for more info.

import linkResolver from '~/libs/prismic/linkResolver'
import { RichText } from 'prismic-dom'
import fitvids from 'fitvids'
import Vue from 'vue'
import vRuntimeTemplate from 'v-runtime-template'

export default {
    props: {
        content: {
            type: Array,
            default: () => [],
        },
        asText: {
            type: Boolean,
            default: false,
        },
        wrapper: {
            type: String,
            default: 'div',
        },
    },
    components: {
        'v-runtime-template': vRuntimeTemplate,
    },
    computed: {
        formattedContent() {
            return (
                '<div>' +
                    RichText[this.asText ? 'asText' : 'asHtml'](
                        this.content,
                        linkResolver,
                        this.htmlSerializer
                    ) +
                    '</div>' || ''
            )
        },
    },
    async mounted() {
        await this.$nextTick()
        fitvids('div[data-oembed]')
    },
    methods: {
        htmlSerializer(type, element, content, children) {
            if (
                element.type == 'hyperlink' &&
                element.data.url &&
                element.data.url.match(/^https?:\/\/[\/#?]/)
            ) {
                return `<a-div :href="'${element.data.url.replace(
                    /^https?:\/\//,
                    ''
                )}'">${content}</a-div>`
            }
            return null
        },
    },
    watch: {
        async content() {
            await this.$nextTick()
            fitvids('div[data-oembed]')
        },
    },
}
</script>
