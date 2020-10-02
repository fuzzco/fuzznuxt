<template>
    <div class="prismic-slices">
        <component
            v-for="(component, i) in slices"
            :key="i"
            :is="`slice-${kebabCase(component.slice_type)}`"
            v-bind="{ items: component.items, ...component.primary }"
            :id="`${kebabCase(component.slice_type)}-${i}`"
        />
    </div>
</template>

<script>
import kebabCase from 'lodash/kebabCase'

export default {
    props: {
        slices: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        kebabCase
    }
}
</script>
