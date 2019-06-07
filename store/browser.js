import loadFonts from '@fuzzco/font-loader'
import Vue from 'vue'

export const state = () => {
    return {
        fontsLoading: true,
        fontsLoaded: false,
        fontsFailed: false,
        windowLoading: true,
        docHeight: 675,
        winHeight: 675,
        winWidth: 1200,
        sTop: 0,
        referredFrom: null,
        hasHover: false,
        hasTouch: false,
        windowBlurred: false,
        dataLoading: false,
        mouseX: 0,
        mouseY: 0
    }
}

export const mutations = {
    FONTS_LOADING: state => {
        state.fontsLoading = true
    },
    FONTS_LOADED: state => {
        state.fontsLoading = false
        state.fontsLoaded = true
    },
    FONTS_FAILED: state => {
        state.fontsLoading = false
        state.fontsFailed = true
    },
    SET_WIN_HEIGHT: (state, height) => {
        state.winHeight = height
    },
    SET_WIN_WIDTH: (state, width) => {
        state.winWidth = width
    },
    SET_SCROLL_TOP: (state, sTop) => {
        state.sTop = sTop
    },
    SET_DOC_HEIGHT: (state, height) => {
        state.docHeight = height
    },
    WINDOW_LOADED: state => {
        state.windowLoading = false
    },
    SET_REFERRED: (state, ref) => {
        state.referredFrom = ref
    },
    USER_CAN_HOVER: state => {
        state.hasHover = true
    },
    USER_CAN_TOUCH: state => {
        state.hasTouch = true
    },
    SET_WINDOW_BLURRED: state => {
        state.windowBlurred = true
    },
    SET_WINDOW_FOCUSSED: state => {
        state.windowBlurred = false
    },
    START_DATA_LOAD: state => {
        state.dataLoading = true
    },
    END_DATA_LOAD: state => {
        state.dataLoading = false
    },
    SET_RELATIVE_MOUSE_POS: (state, { x, y }) => {
        state.mouseX = x
        state.mouseY = y
    }
}

export const actions = {
    LOAD_FONTS: async context => {
        try {
            context.commit('FONTS_LOADING')
            await loadFonts([
                {
                    name: 'Brown',
                    weights: [300, 400, 700],
                    styles: ['normal', 'italic']
                }
            ])
            context.commit('FONTS_LOADED')
        } catch (err) {
            context.commit('FONTS_FAILED')
        }
    }
}

export const getters = {
    breakpoint(state) {
        if (state.winWidth <= 750) return 'mobile'
        return 'desktop'
    },
    isMobile(state) {
        return (state.winWidth && state.winWidth <= 750) || state.hasTouch
    }
}
