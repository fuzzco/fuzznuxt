import Vue from 'vue'
import { kebabCase as _kebabCase } from 'lodash'

// globally register everything in the /components folder that does not end in `.async.vue`.
// name your components `ComponentName.async.vue` to ignore and register manually.
export default () => {
    const components = require.context(
        '~/components',
        true,
        /.*(?<!\.async)\.vue$/
    )
    components.keys().map(component => {
        // turn './ComponentName.vue' into 'component-name'
        const componentName = _kebabCase(
            component.replace(/^\.\//, '').replace(/\.vue$/, '')
        )

        // register new component globally
        Vue.component(componentName, components(component).default)
    })
}
