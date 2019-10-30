import { sampleSize as _sampleSize } from 'lodash'
import Prismic from 'prismic-javascript'

// helper to init API
const CACHE_TIME = 3 * 60 * 1000
let api, stamp
const getApi = () => {
    const isExpired = new Date().getTime() - stamp > CACHE_TIME
    if (!api || isExpired) {
        stamp = new Date().getTime()
        api = Prismic.api(process.env.PRISMIC_URL)
    }
    return api
}

// Query by type
export const fetchByType = async ops => {
    try {
        const api = await getApi()

        // resolve settings
        const settings = Object.assign(
            {
                type: 'page',
                slug: '',
                pageSize: 40,
                page: 1,
                orderings: ''
            },
            ops
        )

        const predicates = [
            Prismic.Predicates.at('document.type', settings.type)
        ]

        // if slug was specified
        if (settings.slug) {
            const artist = await api.getByUID(settings.type, settings.slug)
            return artist
        }

        // run query
        const { results } = await api.query(predicates, {
            pageSize: settings.pageSize,
            page: settings.page,
            orderings: settings.orderings
        })
        return results
    } catch (err) {
        console.log('got an err', err)
        return []
    }
}
