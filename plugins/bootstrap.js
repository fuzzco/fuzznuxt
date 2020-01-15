import prisImg from '~/mixins/prisImg'
import Vue from 'vue'

export default async ({ store, route }, inject) => {
    // load global data
    await Promise.all([store.dispatch('FETCH_SINGLE', { type: 'settings' })])
}
