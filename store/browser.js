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
        windowBlurred: false,
        dataLoading: false,
        mouseX: 0,
        mouseY: 0,
        observer: null,
        prefersReducedMotion: true
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
    },
    INITIALIZE_OBSERVER: (
        state,
        { onEnter, onLeave } = { onEnter: null, onLeave: null }
    ) => {
        state.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view')
                    if (onEnter) {
                        onEnter(entry)
                    }
                } else {
                    entry.target.classList.remove('in-view')
                    if (onLeave) {
                        onLeave(entry)
                    }
                }
            })
        })
    },
    OBSERVE: (state, el) => {
        // cancel if no observer
        if (!state.observer) {
            return
        }

        if (Array.isArray(el)) {
            el.forEach(e => state.observer.observe(e))
        } else {
            state.observer.observe(el)
        }
    },
    SET_PREFERS_REDUCED_MOTION: (state, newVal) => {
        state.prefersReducedMotion = newVal
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
    }
}
