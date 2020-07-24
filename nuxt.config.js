const webpack = require('webpack')
const dotenv = require('dotenv')
dotenv.config()
const generate = require('./scripts/generate')

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
        /** Uncomment this if you need to use the full Vue build */
        // extend(config) {
        //     config.resolve.alias['vue'] = 'vue/dist/vue.common'
        // }
    },

    // Uncomment if making static-only build
    // target: 'static',

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
     * Generation
     */
    generate,

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
            // Add for each font in your project
            // {
            //     rel: 'preload',
            //     href: '/fonts/YOUR_FONT.woff2',
            //     as: 'font',
            //     crossorigin: 'anonymous'
            // },
        ],
        script: [
            {
                src: `//static.cdn.prismic.io/prismic.js?repo=${
                    process.env.PRISMIC_REPO_NAME
                }&new=true`,
                async: true,
                defer: true
            }
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
    modules: [
        '@nuxtjs/style-resources',
        '@nuxtjs/device',
        '@nuxtjs/component-cache',
        '@nuxtjs/prismic'
    ],

    /*
     * Plugins
     */
    plugins: [
        '~/plugins/bootstrap.server.js',
        '~/plugins/browser.client.js'
        // '~/plugins/global-components',
    ],

    /*
     * Prismic
     */
    prismic: {
        endpoint: process.env.PRISMIC_URL,
        linkResolver: '~/libs/prismic/linkResolver'
    },

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
    ...(process.env.NODE_ENV === 'development' ? dev : prod)
}
