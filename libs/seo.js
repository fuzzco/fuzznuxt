export default function(found, fallback) {
    const description =
        _get(found, 'data.seo_description', '') || fallback.seo_description

    store.commit('SET_DESCRIPTION', description)

    return {
        seoTitle: _get(found, 'data.seo_title', '') || fallback.seo_title,
        seoDescription: description,
        seoImage:
            _get(found, 'data.seo_image.Small.url', '') ||
            _get(fallback, 'seo_image.Small.url', '')
    }
}
