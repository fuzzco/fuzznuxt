import { fetchByType } from '~/libs/prismic'
import Cookies from 'js-cookie'
import Vuex from 'vuex'
import Vue from 'vue'

export const state = () => {
    return {
        pageData: {}
    }
}

export const mutations = {
    SET_PAGE_DATA: (state, { key, data }) => {
        Vue.set(state.pageData, key, data)
    },
    REMOVE_PAGE_DATA: (state, key) => {
        Vue.delete(state.pageData, key)
    }
}

export const actions = {
    FETCH_SINGLE: async ({ commit, state }, { type }) => {
        // check if we already have data to return immediately
        if (state.pageData[type]) return state.pageData[type]

        // query Prismic
        const docs = await fetchByType({ type })

        if (docs && docs.length) {
            // commit to store
            commit('SET_PAGE_DATA', {
                key: `${type}`,
                data: docs[0]
            })
            return docs[0]
        }

        // Not found
        return false
    },
    FETCH_BY_SLUG: async ({ commit, state }, { type, slug }) => {
        // check if we already have data to return immediately
        if (state.pageData[`${type}/${slug}`])
            return state.pageData[`${type}/${slug}`]

        // query Prismic
        const doc = await fetchByType({ type, slug })

        console.log('retrieved', doc)
        if (doc) {
            commit('SET_PAGE_DATA', {
                key: `${type}/${slug}`,
                data: doc
            })

            return doc
        }

        // Not found
        return false
    },
    FETCH_VIDEO: async ({ commit, dispatch, state }, ID) => {
        if (state.pageData[`videos/${ID}`])
            return state.pageData[`videos/${ID}`]

        return await dispatch('FORCE_FETCH_VIDEO', ID)
    },
    FORCE_FETCH_VIDEO: async ({ commit, state }, ID) => {
        const video = await getVideo(ID, state.user)
        if (video) {
            commit('SET_PAGE_DATA', {
                key: `videos/${ID}`,
                data: video
            })
        }
        return video
    },
    FETCH_VIDEO_IDS: async ({ commit, state }, ids) => {
        // check if fetch needs to run
        let hasAll = true
        for (let i in ids) {
            const id = ids[i]
            if (!state.pageData[`videos/${id}`]) {
                hasAll = false
                break
            }
        }

        // only run if necessary
        if (!hasAll) {
            // fetch videos and commit all to store
            const videos = await getVideosByIds(ids)
            videos.forEach(video => {
                commit('SET_PAGE_DATA', {
                    key: `videos/${video.id}`,
                    data: video
                })
            })
        }
    },
    SHOW_NOTIFICATION: ({ commit, state }, payload) => {
        const text = payload.text || ''
        const time = payload.time || 5000
        const green = payload.hasOwnProperty('isGreen')
            ? payload.isGreen
            : false

        // change text
        commit('SET_NOTIFICATION_TEXT', text)
        // show banner
        commit('SET_NOTIFICATION_VISIBLE', true)
        // banner color
        commit('SET_NOTIFICATION_GREEN', green)

        // clear old timeout
        if (notificationTimeout) {
            clearTimeout(notificationTimeout)
        }

        // hide text in `time` ms
        notificationTimeout = setTimeout(() => {
            commit('SET_NOTIFICATION_VISIBLE', false)
        }, time)
    }
}

export const getters = {
    contactContent: state => {
        return _get(state, 'pageData.settings.data.contact_intro_content', [])
    },
    contactCta: state => {
        return _get(state, 'pageData.settings.data.contact_cta', [])
    }
}
