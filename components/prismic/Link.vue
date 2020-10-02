<template>
    <a v-if="isExternal" :target="target" :href="link | prisLink">
        <slot />
    </a>
    <router-link v-else :to="link | prisLink">
        <slot />
    </router-link>
</template>

<script>
import get from 'lodash/get'

export default {
    props: {
        link: {
            type: Object,
            required: true,
        },
    },
    computed: {
        isExternal() {
            return get(this.link, 'link_type') == 'Web'
        },
        target() {
            return get(this.link, 'target', '_self')
        },
    },
}
</script>
