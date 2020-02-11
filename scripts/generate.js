const Prismic = require('prismic-javascript')
const dotenv = require('dotenv')
dotenv.config()

const PRISMIC_MAX_PAGES_PER_QUERY = 100

// list of extra paths to add
const pagesToAdd = []
// paths to skip (for example, if already covered in a `pages/x.vue` template)
const pagesToSkip = ['front-page']

const routes = async () => {
    // run query (ensures we get all of a desired type - we ran into a bug
    // where only the first 100 were retrieved, which this loop fixes)
    const results = []
    let latestQuery = null
    let page = 1
    const api = await Prismic.getApi(process.env.PRISMIC_URL)

    do {
        // run query against current page of results
        latestQuery = await api.query('', {
            pageSize: 100,
            page: page++
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

    return new Promise(res =>
        res(
            results
                .map(page => page.uid)
                .filter(v => typeof v === 'string')
                .concat(pagesToAdd)
                .filter(v => !pagesToSkip.includes(v))
        )
    )
}

console.log('start')
routes().then(console.log)

module.exports = {
    routes,
    interval: 250,
    fallback: true
}
