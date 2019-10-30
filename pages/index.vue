<template>
    <main class="home">Test</main>
</template>

<script>
export default {
    async fetch({ store, params, redirect }) {
        const found = await store.dispatch('FETCH_SINGLE', {
            type: 'front_page'
        })
        if (!found) redirect('/not-found')
    }
}
</script>

<style lang="scss">
main.home {
}
</style>
