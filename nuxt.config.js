const webpack = require('webpack')
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    env: {
        ...process.env
    },
    mode: 'universal',

    /*
     * Head
     */
    head: {
        title: 'Fuzznuxt',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }
        ],
        link: [
            { rel: 'icon', href: '/images/favicon.png' },
            { rel: 'stylesheet', href: '/fonts/fonts.css' }
        ]
    },

    /*
     * Global CSS
     */
    css: ['~/assets/scss/_base.scss'],

    /*
     * Plugins
     */
    plugins: [
        { src: '~/plugins/browser', ssr: false },
        '~/plugins/bootstrap',
        '~/plugins/global-components',
        '~/plugins/global-filters'
    ],

    /*
     * Loading bar
     */
    loading: false,

    /*
     * Style resources
     */
    styleResources: {
        scss: ['~/assets/scss/_vars.scss']
    },

    /*
     * Style Resources
     */
    modules: ['@nuxtjs/style-resources'],

    /*
     * Router
     */
    router: {
        middleware: ['updateRoute']
    },

    /*
     * Server
     */
    // force SSL
    serverMiddleware: ['redirect-ssl'],

    /*
     * Build settings
     */
    build: {
        vendor: ['lodash/get', 'lodash/throttle', 'popmotion'],
        plugins: [
            new webpack.ProvidePlugin({
                _get: 'lodash/get'
            })
        ]
    }
}
