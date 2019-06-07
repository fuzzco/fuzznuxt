export default function({ store, from }) {
    // store.commit('SET_MOBILE_MENU_OPENED', false)
    if (from) {
        store.commit('browser/SET_REFERRED', from.fullPath)
    }
}
