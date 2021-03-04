<template>
    <div :class="classes">
        <div id="description" v-html="$store.state.description" />

        <site-header />
        <div class="site-container">
            <transition name="fade" mode="out-in" @beforeEnter="scrollTop">
                <nuxt :key="$route.path" />
            </transition>
        </div>
        <site-footer />
    </div>
</template>

<script>
import kebabCase from 'lodash/kebabCase'

export default {
    data() {
        return {
            isActive: false,
        }
    },
    async mounted() {
        await this.$nextTick()
        this.isActive = true
    },
    components: {
        'site-header': require('~/components/site/header').default,
        'site-footer': require('~/components/site/footer').default,
    },
    computed: {
        classes() {
            return [
                'container',
                kebabCase(this.$route.name),
                { 'is-desktop': this.$device.isDesktop },
                { 'is-mobile': this.$device.isMobileOrTablet },
                {
                    'mobile-menu-opened':
                        this.$device.isMobileOrTablet &&
                        this.$store.state.mobileMenuOpened,
                },
                {
                    'prefers-reduced-motion': this.$store.state.browser
                        .prefersReducedMotion,
                },
            ]
        },
    },
    methods: {
        // scroll to top before fading in new page
        scrollTop() {
            window.scrollTo(0, 0)
        },
    },
}
</script>

<style lang="scss">
.container {
    display: flex;
    flex-direction: column;

    &.prefers-reduced-motion,
    &.prefers-reduced-motion * {
        transition: none !important;
    }

    #description {
        display: none;
    }

    .site-container {
        flex: 1;
    }
}
</style>
