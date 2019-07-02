<template>
    <div :class="classes" v-full-height.min>
        <div id="description" v-html="$store.state.description" />

        <site-header />
        <div class="site-container">
            <transition name="fade" mode="out-in">
                <nuxt :key="$route.fullPath" />
            </transition>
        </div>
        <site-footer />
    </div>
</template>

<script>
import _kebabCase from 'lodash/kebabCase'

export default {
    data() {
        return {
            isTouch: false,
            isActive: false
        }
    },
    async mounted() {
        this.isTouch = this.$store.state.browser.hasTouch

        await this.$nextTick()
        this.isActive = true
    },
    computed: {
        classes() {
            return [
                'container',
                _kebabCase(this.$route.name),
                { 'is-touch': this.isTouch },
                { 'is-hover': !this.isTouch },
                {
                    'mobile-menu-opened':
                        this.$store.getters['browser/isMobile'] &&
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
