export default {
    head() {
        const defaultTitle = this.$store.getters.settings.seo_title
        const defaultDescription = this.$store.getters.settings.site_description
        const defaultImage = (this.$store.getters.settings.site_image || {}).url

        return {
            title: this.seoTitle || this.$store.getters.settings.seo_title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.seoDescription || defaultDescription,
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: this.seoDescription || defaultDescription,
                },
                {
                    hid: 'og:image',
                    property: 'og:image',
                    content: this.seoImage || defaultImage,
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: this.seoTitle || defaultTitle,
                },
                {
                    hid: 'og:type',
                    property: 'og:type',
                    content: this.seoType || 'website',
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: this.seoDescription || defaultDescription,
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: this.seoTitle || defaultTitle,
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                    content: this.seoImage || defaultImage,
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: 'summary_large_image',
                },
            ],
        }
    },
}
