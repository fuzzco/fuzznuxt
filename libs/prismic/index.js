import Prismic from 'prismic-javascript'

const PRISMIC_MAX_PAGES_PER_QUERY = 100

// Query by type
export const prismicQuery = async opts => {
    try {
        // resolve opts
        opts = {
            type: 'page',
            uid: '',
            slug: '',
            pageSize: PRISMIC_MAX_PAGES_PER_QUERY,
            page: 1,
            orderings: '',
            $prismic: this ? this.$prismic : null,
            ...opts
        }

        if (!opts.$prismic) {
            throw new Error(
                'Include a $prismic option to fetch. See https://prismic.io/docs/vuejs/getting-started/the-new-prismic-nuxt-module#7_0-queries'
            )
        }

        const api = opts.$prismic.api

        const predicates = [
            opts.$prismic.predicates.at('document.type', opts.type)
        ]

        // if UID or slug was specified
        if (opts.uid || opts.slug) {
            const result = await api.getByUID(opts.type, opts.uid || opts.slug)
            return result
        }

        // run query (ensures we get all of a desired type - we ran into a bug
        // where only the first 100 were retrieved, which this loop fixes)
        const results = []
        let latestQuery = null
        let page = 1
        do {
            // run query against current page of results
            latestQuery = await api.query(predicates, {
                pageSize: opts.pageSize,
                page: page++,
                orderings: opts.orderings
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
