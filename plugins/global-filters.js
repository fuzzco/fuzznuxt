import Vue from 'vue'
import _camelCase from 'lodash/camelCase'

export default () => {
    // globally register everything in the /filters folder
    const filters = require.context('~/filters', true)
    filters.keys().map(filter => {
        // turn './ComponentName.vue' into 'component-name'
        const filterName = _camelCase(
            filter.replace(/^\.\//, '').replace(/\.js/, '')
        )

        // register new filter globally
        Vue.filter(filterName, filters(filter).default)
    })
}
