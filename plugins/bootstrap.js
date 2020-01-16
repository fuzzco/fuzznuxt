export default async ({ store, route }, inject) => {
    // load global data
    await Promise.all([
        store.dispatch('FETCH_SINGLETON_TYPE', { type: 'settings' })
    ])
}
