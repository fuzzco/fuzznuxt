<template>
    <main class="page">
        <prismic-slices :slices="page.body" />
        <prismic-content :content="page.content" />
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
            params && params.uid ? params.uid : 'front-page'
        )
        return {
            page: doc ? doc.data : null
        }
    }
}
</script>

<style lang="scss">
main.page {
}
</style>
