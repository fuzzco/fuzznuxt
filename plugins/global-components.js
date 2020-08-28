import Vue from 'vue'
import _kebabCase from 'lodash/kebabCase'

// globally register everything in the /components folder
export default () => {
    const components = require.context('~/components', true)
    components.keys().map(component => {
        // turn './ComponentName.vue' into 'component-name'
        const componentName = _kebabCase(
            component.replace(/^\.\//, '').replace(/\.vue$/, '')
        )

        // register new component globally
        Vue.component(componentName, components(component).default)
    })
}
