<template>
    <main class="home">
        <div class="container">
            <prismic-image fill-space fit="contain" v-bind="content.image" />
        </div>

        <prismic-image v-bind="content.image" />
    </main>
</template>

<script>
import seo from '~/libs/seo'
import { head } from '~/mixins'

export default {
    mixins: [head],
    components: {
        'prismic-image': require('~/components/PrismicImage').default
    },
    async asyncData({ store }) {
        const found = await store.dispatch('FETCH_BY_SLUG', {
            slug: 'front-page'
        })
        if (!found) return error({ statusCode: 404, message: 'Not found' })

        const fallback = store.state.pageData.settings
        return seo(found, fallback, store)
    },
    computed: {
        content() {
            return _get(this.$store.state, 'pageData.front_page.data', {})
        }
    }
}
</script>

<style lang="scss">
main.home {
    .container {
        width: 200px;
        position: relative;
        height: 400px;
    }
}
</style>
