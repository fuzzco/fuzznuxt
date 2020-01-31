import { sampleSize as _sampleSize } from 'lodash'
import Prismic from 'prismic-javascript'

const PRISMIC_MAX_PAGES_PER_QUERY = 100

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
                pageSize: PRISMIC_MAX_PAGES_PER_QUERY,
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

        // run query (ensures we get all of a desired type - we ran into a bug
        // where only the first 100 were retrieved, which this loop fixes)
        const results = []
        let latestQuery = null
        let page = 1
        do {
            // run query against current page of results
            latestQuery = await api.query(predicates, {
                pageSize: settings.pageSize,
                page: page++,
                orderings: settings.orderings
            })
            // if we get a valid result, add that result to our master output
            if (latestQuery && Array.isArray(latestQuery.results)) {
                results.push(...latestQuery.results)
            }
        } while (
            // keep running as long as we have a valid query & maxed-out results lengths
            latestQuery &&
            Array.isArray(latestQuery.results) &&
            latestQuery.results.length === PRISMIC_MAX_PAGES_PER_QUERY
        )
        return results
    } catch (err) {
        console.log('got an err', err)
        return []
    }
}
