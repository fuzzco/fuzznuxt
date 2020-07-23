import { throttle } from 'lodash'
import { autoBlur } from 'auto-blur'
import {
    mouseMoveHandler,
    resizeHandler,
    scrollHandler
} from '~/plugins/dom-handlers'
import Vue from 'vue'

// plugin
export default async ({ store, route }, inject) => {
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
    Vue.component('a-div', require('~/components/ADiv.vue').default)
    Vue.component(
        'prismic-image',
        require('~/components/prismic/Image.vue').default
    )
    Vue.component(
        'prismic-content',
        // standard build, no relative links in content
        require('~/components/prismic/Content.vue').default
        // full build, relative links in content work correctly
        // require('~/components/prismic/ContentFull.vue').default
    )

    // autoblur
    autoBlur()
    autoBlur('A')
    autoBlur('SUMMARY')

    // prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    store.commit('browser/SET_PREFERS_REDUCED_MOTION', mediaQuery.matches)
    mediaQuery.addEventListener('change', () => {
        store.commit('browser/SET_PREFERS_REDUCED_MOTION', mediaQuery.matches)
    })
}
