export default {
    head() {
        return {
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.seoDescription
                },
                {
                    hid: 'og:image',
                    name: 'og:image',
                    content: this.seoImage
                }
            ]
        }
    }
}
