import throttle from 'lodash/throttle'
import { autoBlur } from 'auto-blur'
import {
    mouseMoveHandler,
    resizeHandler,
    scrollHandler
} from '~/libs/dom-handlers'
// import Vue from 'vue'
// import Intersect from '~/directives/intersect'
// import ReverseHover from '~/directives/reverse-hover'
// import PathLength from '~/directives/path-length'

// plugin
export default async ({ store, route, $prismic }) => {
    // Directives
    // Vue.directive('intersect', Intersect)
    // Vue.directive('reverse-hover', ReverseHover)
    // Vue.directive('path-length', PathLength)

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

    // autoblur
    autoBlur()
    autoBlur('A')
    autoBlur('SUMMARY')

    // prefers-reduced-motion tie-in to store
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    store.commit('browser/SET_PREFERS_REDUCED_MOTION', mediaQuery.matches)
    // try to update if user changes while the page is open
    if (mediaQuery && mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', () => {
            store.commit(
                'browser/SET_PREFERS_REDUCED_MOTION',
                mediaQuery.matches
            )
        })
    }

    // smooth scroll to hash links
    if (!store.state.browser.prefersReducedMotion) {
        const zen = require('zenscroll')
        setTimeout(() => {
            if (route.hash && document.querySelector(route.hash)) {
                zen.center(document.querySelector(route.hash))
            }
        }, 400)
    }

    // fetch settings
    // this should be done already in bootstrap.server.js, but just in case!
    Promise.all([
        store.dispatch('FETCH_SINGLETON_TYPE', {
            type: 'settings',
            $prismic
        })
    ])

    // run resize handler
    resizeHandler(store)
}
