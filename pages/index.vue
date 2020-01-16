<template>
    <main class="home"><h2>Home</h2></main>
</template>

<script>
import seo from '~/libs/seo'
import { head, fetchBySlug } from '~/mixins'

export default {
    mixins: [head, fetchBySlug]
}
</script>

<style lang="scss">
main.home {
}
</style>
