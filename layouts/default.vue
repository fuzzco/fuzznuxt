<template>
    <div :class="classes">
        <div id="description" v-html="$store.state.description" />

        <site-header />
        <div class="site-container">
            <transition name="fade" mode="out-in">
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
            isActive: false
        }
    },
    async mounted() {
        await this.$nextTick()
        this.isActive = true
    },
    components: {
        'site-header': require('~/components/site/header').default,
        'site-footer': require('~/components/site/footer').default
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
                        this.$store.state.mobileMenuOpened
                }
            ]
        }
    }
}
</script>

<style lang="scss">
.container {
    display: flex;
    flex-direction: column;

    #description {
        display: none;
    }

    .site-container {
        flex: 1;
    }
}
</style>
