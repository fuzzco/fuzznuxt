import _throttle from 'lodash/throttle'
import Vue from 'vue'
import FullHeight from 'fh-components/v-full-height'
import scrollTo from 'fh-components/scroll-to'
import mailingList from 'fh-components/mailing-list'
import splitText from 'fh-components/split-text'
import videoStage from 'fh-components/video-stage'
import Cookies from 'js-cookie'
import isTouchDevice from 'is-touch-device'
import qs from 'qs'
import { autoBlur } from 'auto-blur'
import setupMousePositionWatcher from '~/plugins/mouse-position'
import head from '~/mixins/head'

// Fuzzco elements
import inView from '@fuzzco/in-view'
import FragmentShader from '@fuzzco/fragment-shader'
import VueMarquee from '@fuzzco/vue-marquee'
import ScrubWrap from '@fuzzco/scrub-wrap'
import SuperImage from '@fuzzco/super-image'

// resize handler
const setSizes = store => {
    store.commit('browser/SET_WIN_WIDTH', window.innerWidth)
    store.commit('browser/SET_WIN_HEIGHT', window.innerHeight)
    const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    )
    store.commit('browser/SET_DOC_HEIGHT', docHeight)
}

// scroll handler
const setScroll = store => {
    const sTop = window.pageYOffset || document.documentElement.scrollTop
    store.commit('browser/SET_SCROLL_TOP', sTop)
}

// plugin
export default async ({ store, route }, inject) => {
    // polyfill
    require('string.prototype.includes')

    // size/scroll handlers
    const onResize = () => setSizes(store)
    const onScroll = () => setScroll(store)

    // set listeners + kick
    window.addEventListener('resize', _throttle(onResize, 50))
    // ~16ms is 60fps
    window.addEventListener('scroll', _throttle(onScroll, 16))
    onResize()
    onScroll()

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
    Vue.directive('full-height', FullHeight)
    // Vue.directive('reverse-hover', require('fh-components/v-reverse-hover'))
    Vue.directive('in-view', require('fh-components/v-in-view'))

    // watch mouse position
    setupMousePositionWatcher(store)

    // register components
    // Vue.component('scroll-to', scrollTo)
    // Vue.component('mailing-list', mailingList)
    // Vue.component('split-text', splitText)
    // Vue.component('video-stage', videoStage)
    // Vue.component('fragment-shader', FragmentShader)
    // Vue.component('vue-marquee', VueMarquee)
    // Vue.component('scrub-wrap', ScrubWrap)
    Vue.component('super-image', SuperImage)

    // Register mixins
    Vue.mixin(inView)
    Vue.mixin(head)

    // autoblur
    autoBlur()
    autoBlur('A')
    autoBlur('SUMMARY')
}
