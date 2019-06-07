import prisText from '~/filters/prisText'

export default function(a) {
    // pull data from global settings
    const settings = _get(this.$store.state, 'pageData.settings.data', {})

    // set values
    const title =
        (this.metaTitle || prisText(settings.title)) +
        (this.metaTitleAfter || '')
    const image = this.metaImage || settings.site_image.url
    const description = this.metaDescription || prisText(settings.description)

    return {
        title: title,
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: description
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content: description
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: image
            },
            {
                hid: 'twitter:description',
                property: 'twitter:description',
                content: description
            },
            {
                hid: 'twitter:title',
                property: 'twitter:title',
                content: title
            },
            {
                hid: 'twitter:image',
                property: 'twitter:image',
                content: image
            },
            {
                hid: 'twitter:card',
                name: 'twitter:card',
                content: 'summary_large_image'
            }
        ]
    }
}
