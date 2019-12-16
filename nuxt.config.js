const webpack = require('webpack')
const dotenv = require('dotenv')
dotenv.config()

const universal = {
    /*
     * Build settings
     */
    build: {
        plugins: [
            new webpack.ProvidePlugin({
                _get: 'lodash/get'
            })
        ]
    },

    /*
     * Global CSS
     */
    css: ['~/assets/scss/_base.scss'],

    /*
     * Env variables
     */
    env: {
        ...process.env
    },

    /*
     * Head
     */
    head: {
        htmlAttrs: {
            lang: 'en'
        },
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
     * Loading bar
     */
    loading: false,

    /*
     * Build mode
     */
    mode: 'universal',

    /*
     * Modules
     */
    modules: ['@nuxtjs/style-resources', '@nuxtjs/device'],

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
     * Router
     */
    router: {
        middleware: ['updateRoute']
    },

    /*
     * Style resources
     */
    styleResources: {
        scss: ['~/assets/scss/_vars.scss']
    }
}

/*
 * Dev-only config
 */
const dev = {
    /*
     * Webpack build options
     */
    build: {
        ...universal.build,
        analyze: true
    },

    /*
     * Server options
     */
    server: {
        port: 80,
        host: '0.0.0.0'
    }
}

/*
 * Prod-only config
 */
const prod = {
    /*
     * Server middleware
     */
    serverMiddleware: ['redirect-ssl']
}

module.exports = {
    ...universal,
    ...(process.env === 'development' ? dev : prod)
}
