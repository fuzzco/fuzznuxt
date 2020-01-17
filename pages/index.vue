<template>
    <main class="home">
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
    async fetch({ store, params, error }) {
        const found = await store.dispatch('FETCH_SINGLETON_TYPE', {
            type: 'front_page'
        })
        if (!found) return error({ statusCode: 404, message: 'Not found' })
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
}
</style>
