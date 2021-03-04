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
        const page = doc ? doc.data : { body: [], content: [] }

        // prep SEO:
        // - title
        const seoTitle = get(
            page,
            'seo_title',
            store.getters.settings.seo_title
        )
        // - description
        const seoDescription = get(
            page,
            'data.seo_description',
            store.getters.settings.seo_description
        )
        // (commit our description)
        store.commit('SET_DESCRIPTION', seoDescription)
        // - image
        const seoImage = get(
            page,
            'seo_image.Small.url',
            store.getters.settings.seo_image || {}
        ).url

        // return fetched data and SEO
        return {
            page,
            seoTitle,
            seoDescription,
            seoImage,
        }
    },
}
</script>

<style lang="scss">
</style>
