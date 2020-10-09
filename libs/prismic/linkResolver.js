import get from 'lodash/get'

const resolver = doc => {
    if (doc === undefined) {
        return '/not-found-undefined'
    }

    // parse uid
    const uid = doc.uid || doc.slug || get(doc, 'slugs[0]', null) || 'no uid'

    return `/${uid}`
}

export default resolver
