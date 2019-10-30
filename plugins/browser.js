import Vue from 'vue'
import { throttle } from 'lodash'
import isTouchDevice from 'is-touch-device'
import { autoBlur } from 'auto-blur'
import {
    mouseMoveHandler,
    resizeHandler,
    scrollHandler
} from '~/plugins/dom-handlers'

// plugin
export default async ({ store, route }, inject) => {
    // polyfill
    require('string.prototype.includes')

    // size/scroll handlers
    const onResize = () => resizeHandler(store)
    const onScroll = () => scrollHandler(store)

    // setup dom listeners
    window.addEventListener('resize', throttle(onResize, 50))
    // ~16ms is 60fps
    window.addEventListener('scroll', throttle(onScroll, 16))
    // watch mouse position
    window.addEventListener('mousemove', evt => {
        mouseMoveHandler(evt, store)
    })

    // detect window blur/focus
    window.onblur = () => {
        store.commit('browser/SET_WINDOW_BLURRED')
    }
    window.onfocus = () => {
        store.commit('browser/SET_WINDOW_FOCUSSED')
    }

    // detect touch or hover
    if (isTouchDevice()) {
        store.commit('browser/USER_CAN_TOUCH')
    } else {
        store.commit('browser/USER_CAN_HOVER')
    }

    // load fonts
    store.dispatch('browser/LOAD_FONTS')

    // register directives
    Vue.directive('full-height', require('fh-components/v-full-height'))
    // Vue.directive('reverse-hover', require('fh-components/v-reverse-hover'))
    // Vue.directive('in-view', require('fh-components/v-in-view'))

    // register components
    // Vue.component('scroll-to', require('fh-components/scroll-to'))
    // Vue.component('mailing-list', require('fh-components/mailing-list'))
    // Vue.component('split-text', require('fh-components/split-text'))
    // Vue.component('video-stage', require('fh-components/video-stage'))
    // Vue.component('fragment-shader', require('@fuzzco/fragment-shader'))
    // Vue.component('vue-marquee', require('@fuzzco/vue-marquee'))
    // Vue.component('scrub-wrap', require('@fuzzco/scrub-wrap'))
    Vue.component('super-image', require('@fuzzco/super-image'))

    // Register mixins
    Vue.mixin(require('@fuzzco/in-view'))
    Vue.mixin(require('~/mixins/head'))

    // autoblur
    autoBlur()
    autoBlur('A')
    autoBlur('SUMMARY')
}
