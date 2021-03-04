<template>
    <main class="page">
        <prismic-slices :slices="page.body" />
        <prismic-content :content="page.content" />
    </main>
</template>

<script>
import head from '~/mixins/head'
import get from 'lodash/get'

export default {
    mixins: [head],
    async asyncData({ $prismic, params, store }) {
        // fetch data
        const doc = await $prismic.api.getByUID(
            'page',
            params && params.uid ? params.uid : 'front-page'
        )
        const page = doc ? doc.data : null

        // prep SEO
        const description = get(
            page,
            'data.seo_description',
            store.getters.settings.seo_description
        )
        store.commit('SET_DESCRIPTION', description)

        // return fetched data and SEO
        return {
            page,
            seoTitle: get(page, 'seo_title', store.getters.settings.seo_title),
            seoDescription: description,
            seoImage: get(
                page,
                'seo_image.Small.url',
                store.getters.settings.seo_image || {}
            ).url,
        }
    },
}
</script>

<style lang="scss">
main.page {
}
</style>
