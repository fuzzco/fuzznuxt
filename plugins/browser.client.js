import throttle from 'lodash/throttle'
import { autoBlur } from 'auto-blur'
import {
    mouseMoveHandler,
    resizeHandler,
    scrollHandler
} from '~/libs/dom-handlers'
import Vue from 'vue'
import Intersect from '~/directives/intersect'

// plugin
export default async ({ store, route }, inject) => {
    // Directives
    Vue.directive('intersect', Intersect)

    // smooth scroll to hash link
    const zen = require('zenscroll')
    zen.setup(null, -20)
    setTimeout(() => {
        if (route.hash && document.querySelector(route.hash)) {
            zen.center(document.querySelector(route.hash))
        }
    }, 400)

    // setup dom listeners
    // ~16ms is 60fps
    window.addEventListener('resize', throttle(() => resizeHandler(store), 16))
    window.addEventListener('scroll', throttle(() => scrollHandler(store), 16))
    window.addEventListener('mousemove', evt => {
        mouseMoveHandler(evt, store)
    })
    document.addEventListener('visibilitychange', evt => {
        store.commit(
            store.state.browser.windowBlurred
                ? 'browser/SET_WINDOW_FOCUSSED'
                : 'browser/SET_WINDOW_BLURRED'
        )
    })

    // load fonts
    store.dispatch('browser/LOAD_FONTS')

    // global important components
    // Vue.component('a-div', require('~/components/ADiv.vue').default)
    // Vue.component(
    //     'prismic-image',
    //     require('~/components/prismic/Image.vue').default
    // )
    // Vue.component(
    //     'prismic-content',
    //     require('~/components/prismic/Content.vue').default
    // )

    // autoblur
    autoBlur()
    autoBlur('A')
    autoBlur('SUMMARY')

    // prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    store.commit('browser/SET_PREFERS_REDUCED_MOTION', mediaQuery.matches)
    if (mediaQuery && mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', () => {
            store.commit(
                'browser/SET_PREFERS_REDUCED_MOTION',
                mediaQuery.matches
            )
        })
    }

    resizeHandler(store)
}
