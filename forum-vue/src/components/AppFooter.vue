<script setup lang="ts">
import links from '@/data/links.js';
</script>

<template>
    <footer id="app-footer"> 
        <ul :class="$style.linkList" class="container">
            <li v-for="(link, linkKey) in links" :class="$style.linkLi">
                <RouterLink :to="link" :class="$style.link">{{ linkKey }}</RouterLink>
            </li>
        </ul>
    </footer>

</template>

<style module>

.linkLi {
    width: 5em;
}

.link {
    display: block;
    line-height: var(--footer-height);
    width: 100%;
    text-align: center;
}

.linkList {
    height: var(--footer-height);
    display: flex;
    justify-content: end;
}

</style>


<style>

#app-footer {
    background-color: var(--earie-black);
    font-size: 0.9em;
    height: var(--footer-height);
}

#app-footer :is(.router-link-exact-active, a:hover) {
    border-bottom: 1px solid var(--bone);
}

</style>
