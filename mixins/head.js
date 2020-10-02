import get from 'lodash/get'
const defaultImage = 'URL OF FALLBACK IMAGE FROM STATIC FOLDER HERE'

export default {
    head() {
        return {
            title: this.seoTitle || this.seoDefaultTitle,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.seoDescription || this.seoDefaultDescription,
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: this.seoDescription || this.seoDefaultDescription,
                },
                {
                    hid: 'og:image',
                    property: 'og:image',
                    content: this.seoImage || this.seoDefaultImage,
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: this.seoTitle || this.seoDefaultTitle,
                },
                {
                    hid: 'og:type',
                    property: 'og:type',
                    content: this.seoType || 'website',
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: this.seoDescription || this.seoDefaultDescription,
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: this.seoTitle || this.seoDefaultTitle,
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                    content: this.seoImage || this.seoDefaultImage,
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: 'summary_large_image',
                },
            ],
        }
    },
    computed: {
        seoDefaultImage() {
            return (
                get(
                    this.$store.state,
                    'pageData.settings.data.site_image.url'
                ) || defaultImage
            )
        },
        seoDefaultDescription() {
            return (
                get(
                    this.$store.state,
                    'pageData.settings.data.site_description'
                ) || ''
            )
        },
        seoDefaultTitle() {
            return (
                get(this.$store.state, 'pageData.settings.data.site_title') ||
                ''
            )
        },
    },
}
