import { get } from 'lodash'

export default function(found, fallback, store) {
    fallback = fallback || {}

    const description =
        get(found, 'data.seo_description', '') || fallback.seo_description

    store.commit('SET_DESCRIPTION', description)

    return {
        seoTitle: get(found, 'seo_title', '') || fallback.seo_title,
        seoDescription: description,
        seoImage:
            get(found, 'seo_image.Small.url', '') ||
            get(fallback, 'seo_image.Small.url', '')
    }
}
