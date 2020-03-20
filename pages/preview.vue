<template>
    <div />
</template>

<script>
import linkResolver from '~/libs/prismic/linkResolver'
import Prismic from 'prismic-javascript'

export default {
    async mounted() {
        let previewToken = this.$route.query.token
        const api = await Prismic.getApi(process.env.PRISMIC_URL)
        const url = await api.previewSession(previewToken, linkResolver, '/')
        this.$router.push(url)
    }
}
</script>
