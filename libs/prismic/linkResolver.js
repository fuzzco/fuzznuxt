import get from 'lodash/get'

const resolver = doc => {
    if (doc === undefined) {
        return '/not-found-undefined'
    }

    // parse slug
    const slug = doc.uid || doc.slug || get(doc, 'slugs[0]') || 'no slug'

    return `/${slug}`
}

export default resolver
