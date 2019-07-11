export default {
    head() {
        return {
            title: this.seoTitle,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.seoDescription
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: this.seoDescription
                },
                {
                    hid: 'og:image',
                    name: 'og:image',
                    content: this.seoImage
                },
                {
                    hid: 'twitter:description',
                    property: 'twitter:description',
                    content: this.seoDescription
                },
                {
                    hid: 'twitter:title',
                    property: 'twitter:title',
                    content: this.seoTitle
                },
                {
                    hid: 'twitter:image',
                    property: 'twitter:image',
                    content: this.seoImage
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: 'summary_large_image'
                }
            ]
        }
    }
}
