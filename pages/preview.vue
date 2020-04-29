<template>
    <div />
</template>

<script>
import linkResolver from '~/libs/prismic/linkResolver'
import Prismic from 'prismic-javascript'

export default {
    async mounted() {
        const { token, documentId } = this.$route.query
        const api = await Prismic.getApi(process.env.PRISMIC_URL)
        const url = await api
            .getPreviewResolver(token, documentId)
            .resolve(linkResolver, '/')
        this.$router.push(url)
    }
}
</script>
