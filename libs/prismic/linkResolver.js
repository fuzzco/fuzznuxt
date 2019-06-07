const resolver = doc => {
    if (doc == undefined) {
        return '/not-found'
    }

    // parse slug
    const slug = doc.uid || doc.slug || _get(doc, 'slugs[0]')

    if (doc.isBroken) {
        return '/not-found'
    }

    // external link
    if (doc.link_type === 'Web') {
        // handle hash links
        if (String(doc.url).match(/:\/\/#/g)) {
            return String(doc.url).replace(/^(http|https):\/\//g, '')
        }

        return doc.url
    }

    // example
    // if (doc.type === 'collections_page') {
    //     return `/collections`
    // }

    // front page
    if (doc.type === 'front_page') {
        return `/`
    }

    // how-it-works
    if (doc.type === 'how_suki_works') {
        return `/how-suki-works`
    }

    // pricing
    if (doc.type === 'pricing') {
        return `/pricing`
    }

    // surgeons
    if (doc.type === 'for_surgeons') {
        return `/for-surgeons`
    }
    // technology
    // TODO

    // generic page
    if (doc.type === 'single_page') {
        return `/${slug}`
    }

    return '/not-found'
}

export default resolver
