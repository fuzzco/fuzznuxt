import { throttle } from 'lodash'
import { autoBlur } from 'auto-blur'
import {
    mouseMoveHandler,
    resizeHandler,
    scrollHandler
} from '~/plugins/dom-handlers'

// plugin
export default async ({ store, route }, inject) => {
    // setup dom listeners
    // ~16ms is 60fps
    window.addEventListener('resize', throttle(() => resizeHandler(store), 16))
    window.addEventListener('scroll', throttle(() => scrollHandler(store), 16))
    window.addEventListener('mousemove', evt => {
        mouseMoveHandler(evt, store)
    })
    window.onblur = () => {
        store.commit('browser/SET_WINDOW_BLURRED')
    }
    window.onfocus = () => {
        store.commit('browser/SET_WINDOW_FOCUSSED')
    }

    // load fonts
    store.dispatch('browser/LOAD_FONTS')

    // autoblur
    autoBlur()
    autoBlur('A')
    autoBlur('SUMMARY')
}
