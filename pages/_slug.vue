<template>
    <!-- This is a template for any Fuzznuxt page. You can duplicate this file to
    get started right away. -->
    <main class="page">
        <nuxt-link to="/">Home</nuxt-link>
    </main>
</template>

<script>
import seo from '~/libs/seo'
import { head, fetchBySlug } from '~/mixins'

export default {
    mixins: [head, fetchBySlug]
}

// if fetchBySlug isn't enough, you can remove the above and use this:
// import seo from '~/libs/seo'
// import { head } from '~/mixins'
//
// export default {
//     mixins: [head],
//     async fetch({ store, params, error }) {
//         const found = await store.dispatch('FETCH_BY_SLUG', {
//             type: 'your-type',
//             slug: 'your-slug'
//         })
//         if (!found) return error({ statusCode: 404, message: 'Not found' })
//     }
// }
</script>

<style lang="scss">
main.page {
}
</style>
