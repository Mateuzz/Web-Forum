<script setup lang="ts">
import '@assets/main.css'

import { RouterView } from 'vue-router';

</script>

<template>
    <div id="app" class="flowV">
        <RouterView/>
    </div>
</template>

<style>

:root {
    --app-v-margin: 1em;
    --flow-v-space: var(--app-v-margin);
    --header-height: 6em;
    --footer-height: var(--nav-height);

    --first-header-height: calc(var(--header-height) * 0.64);
    --nav-height: calc(var(--header-height) - var(--first-header-height));
}

main {
    min-height: calc(100vh - var(--header-height) - var(--footer-height));
}

</style>
