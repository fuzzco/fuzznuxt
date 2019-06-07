import prisImg from '~/mixins/prisImg'
import Vue from 'vue'

export default async ({ store, route }, inject) => {
    // img mixins
    Vue.mixin(prisImg)

    // load global data
    await Promise.all([store.dispatch('FETCH_SINGLE', { type: 'settings' })])
}
