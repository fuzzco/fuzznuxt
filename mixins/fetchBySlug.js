export default {
    async fetch({ store, params, error }) {
        const found = await store.dispatch('FETCH_BY_SLUG', {
            slug: params.slug
        })
        if (!found) return error({ statusCode: 404, message: 'Not found' })
    }
}
