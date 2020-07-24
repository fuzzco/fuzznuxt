<template>
    <main class="page">
        <nuxt-link to="/">Home</nuxt-link>
    </main>
</template>

<script>
import seo from '~/libs/seo'
import { head } from '~/mixins'

export default {
    mixins: [head],
    async asyncData({ $prismic, store, params, error }) {
        const { slug } = params

        const found = await store.dispatch('FETCH_BY_SLUG', {
            slug: slug || 'front-page',
            $prismic
        })

        if (!found) return error({ statusCode: 404, message: 'Not found' })

        const fallback = store.state.pageData.settings
        return seo(found, fallback, store)
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
