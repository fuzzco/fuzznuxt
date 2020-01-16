import { fetchByType } from '~/libs/prismic'
import Cookies from 'js-cookie'
import Vuex from 'vuex'
import Vue from 'vue'

export const state = () => {
    return {
        pageData: {},
        description: ''
    }
}

export const mutations = {
    SET_PAGE_DATA: (state, { key, data }) => {
        Vue.set(state.pageData, key, data)
    },
    REMOVE_PAGE_DATA: (state, key) => {
        Vue.delete(state.pageData, key)
    },
    SET_DESCRIPTION: (state, description) => {
        state.description = description
    },
    SET_BODY_SCROLL: (state, toScroll) => {
        document.body.classList[toScroll ? 'remove' : 'add']('scroll-prevented')
    }
}

export const actions = {
    FETCH_SINGLETON_TYPE: async ({ commit, state }, { type }) => {
        // check if we already have data to return immediately
        if (state.pageData[type]) return state.pageData[type]

        // query Prismic
        const docs = await fetchByType({ type })

        if (docs && docs.length) {
            const data = docs[0]

            // commit to store
            commit('SET_PAGE_DATA', {
                key: `${type}`,
                data
            })
            return data
        }

        // Not found
        return false
    },
    FETCH_BY_SLUG: async ({ commit, state }, opts = {}) => {
        // handle if the user just passed a string for the slug
        if (typeof opts === 'string') {
            opts = { slug: opts }
        }

        // slug fallback to `front-page`
        opts.slug = opts.hasOwnProperty('slug') ? opts.slug : 'front-page'
        // type fallback to empty
        opts.type = opts.hasOwnProperty('type') ? opts.type : 'page'

        // build key
        const key = `${opts.type}/${opts.slug}`

        // check if we already have data to return immediately
        if (state.pageData[key]) return state.pageData[key]

        // query Prismic
        const data = await fetchByType(opts)

        if (data) {
            commit('SET_PAGE_DATA', {
                key,
                data
            })

            return data
        }

        // Not found
        return false
    }
}
