export default async ({ store, $prismic }) => {
    // load global data
    await Promise.all([
        store.dispatch('FETCH_SINGLETON_TYPE', {
            type: 'settings',
            $prismic
        })
    ])
}
