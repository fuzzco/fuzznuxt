<template>
    <div class="error-page">
        <h2>404 Not Found</h2>
    </div>
</template>

<style lang="scss">
@import '../assets/scss/vars';

.error-page {
    @include fill;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h2 {
        font-size: 34px;
    }
    a {
        font-size: 28px;
    }
}
</style>
