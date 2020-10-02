// you'll need to run `npm install backstopjs -D` before running this script

const backstop = require('backstopjs')
const Prismic = require('prismic-javascript')
require('dotenv').config()
const get = require('lodash/get')
const { spawn, execSync } = require('child_process')
const colors = require('colors')
const config = require('./config.json')
const prompts = require('prompts')

// helper to init API
const CACHE_TIME = 3 * 60 * 1000
let api, stamp
const getApi = async () => {
    const isExpired = new Date().getTime() - stamp > CACHE_TIME
    if (!api || isExpired) {
        stamp = new Date().getTime()
        api = Prismic.api(
            `https://${process.env.PRISMIC_REPO_NAME}.cdn.prismic.io/api/v2`
        )
    }
    return api
}

// get all the slugs we'll be testing by querying Prismic
const getSlugs = async () => {
    const api = await getApi()

    const res = await api.query('', { pageSize: 100 })
    const results = get(res, 'results', [])
    return (slugs = results.map((page) => get(page, 'uid', '')).filter(Boolean))
}

// start server
// const startServer = async () => {
//     return new Promise(async res => {
//         const server = await spawn('npm', ['run', 'dev'])
//         server.on('error', console.log)
//         server.stdout.on('data', data => {
//             process.stdout.write('.'.yellow)
//             // this is probably a terrible way to do this
//             if (data.includes('Server listening')) {
//                 res(server)
//             }
//         })
//     })
// }

// roadmap
const run = async () => {
    let server, dynConfig
    let passesTest = false
    try {
        // get page slugs
        const slugs = await getSlugs()

        // cancel if none
        if (!slugs.length) {
            console.log(
                `No pages found. Is Prismic set up correctly?\n\n- Check .env file and make sure PRISMIC_REPO_NAME is set to a valid Prismic repo.\n\nExiting tests.`
                    .yellow
            )

            return
        }

        console.log(
            `Found ${slugs.length} pages to test: ${slugs.join(', ')}.`.green
        )

        // start server
        process.stdout.write('Starting server\n'.yellow)
        // server = await startServer()
        console.log('Ready!'.green)

        // run tests
        try {
            dynConfig = {
                ...config,
            }
            const url = config.scenarios[0].url + '/'
            slugs
                .filter((slug) => slug !== 'front-page')
                .forEach((slug) => {
                    dynConfig.scenarios.push({
                        label: slug,
                        url: url + slug,
                    })
                })

            await backstop('test', { config: dynConfig })
            console.log('All tests passed!'.green)
            passesTest = true
        } catch (err) {
            console.log('Backstop error: '.red + err)
        }

        // approval?
        if (!passesTest) {
            let response = 'NULL'
            while (
                response &&
                response.toLowerCase() != 'y' &&
                response.toLowerCase() != 'n'
            ) {
                const raw = await prompts({
                    type: 'text',
                    name: 'approval',
                    message: 'Approve new versions? (y/N)',
                })
                response = raw.approval
            }
            if (response.toLowerCase() == 'y') {
                await backstop('approve', { config: dynConfig })
            } else {
                console.log('Changes rejected.'.yellow)
            }
        }
    } catch (err) {
        console.log('Error:'.red)
        console.log(err)
    }
    console.log('Stopping server...'.yellow)
    if (server) {
        server.kill()
    }
    console.log('Server stopped. Testing complete.'.yellow)
}

// run!
run()
