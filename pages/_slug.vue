<template>
    <main class="page">
        <prismic-slices :slices="page.body" />
        <prismic-content v-if="!$route.params.slug" :content="page.content" />
    </main>
</template>

<script>
import seo from '~/libs/seo'
import { head } from '~/mixins'

export default {
    mixins: [head],
    async asyncData({ $prismic, error, params }) {
        const doc = await $prismic.api.getByUID(
            'page',
            params && params.slug ? params.slug : 'front-page'
        )
        return {
            page: doc ? doc.data : null
        }
    }
}

// if fetchBySlug isn't enough, you can remove the above and use this:
// import seo from '~/libs/seo'
// import { head } from '~/mixins'
//
// export default {
//     mixins: [head],
//     async fetch({ $prismic, store, params, error }) {
//         const found = await store.dispatch('FETCH_BY_SLUG', {
//             type: 'your-type',
//             slug: 'your-slug',
//             $prismic
//         })
//         if (!found) return error({ statusCode: 404, message: 'Not found' })
//     }
// }
</script>

<style lang="scss">
main.page {
}
</style>
