<script setup lang="ts">

import { RouterLink, useRouter } from 'vue-router';
import { Auth } from '@/api/auth.js';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import links from '@/data/links.js';
import { computed } from 'vue'

const router = useRouter()

const logged = computed(() => !!Auth.userInstance.value)

async function logout() {
    Auth.logout()
    alert("Logged sucessfully.")
    router.push({ name: 'home' })
}

</script>

<template>
    <header :class="$style.header" id="app-header">
        <div :class="$style.registrationHeader" class="container" id="app-first-header">

            <div :class="$style.logoWrapper">
                <img :class="$style.logo" src="@img/main_icon.webp" width="100px">
            </div>

            <ul v-if="logged" :class="[$style.linkList, $style.profileButtons]">
                <li>
                    <RouterLink :to="{ name: 'user-profile', params: { id: Auth.userInstance.value!.id.toString() } }" :class="$style.profileButtonWithIcon">
                        <FontAwesomeIcon :class="$style.icon" :icon="faUser"/>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink :to="{ name: 'post-create' }" :class="$style.profileButtonWithText">
                        New Post
                    </RouterLink>
                </li>
                <li>
                    <button :class="$style.profileButtonWithText" @click="logout">
                        Logout
                    </button>
                </li>
            </ul>

            <ul v-else :class="[$style.linkList, $style.loginButtons]">
                <li>
                    <RouterLink :to="{ name: 'login' }" :class="$style.login"> Login </RouterLink>
                </li>
                <li>
                    <RouterLink :to="{ name: 'signup' }" :class="$style.signup"> Sign Up </RouterLink>
                </li>
            </ul>

        </div>

        <nav :class="$style.nav" id="app-main-nav">
            <ul :class="$style.linkList">
                <li v-for="(link, linkKey) in links">
                    <RouterLink :to="link">{{ linkKey }}</RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style module>

.header {
    font-size: 0.9em;
    background-color: var(--oninx);
    position: sticky;
    top: 0;
    z-index: 10;
}

.linkList {
    display: flex;
    align-items: center;
}

.linkList > li {
    flex-basis: 6em;
}

.linkList a {
    display: block;
    text-align: center;
    transition: all linear 0.1s;
}

.logoWrapper img {
    height: 100%;
    width: auto;
}

.registrationHeader {
    padding: 0.25em 0;
    display: flex;
    justify-content: space-between;
    height: var(--first-header-height);
}

.loginButtons a {
    width: 5em;
}

.registrationHeader :is(a, button) {
    box-shadow: 0 0 2px 0px var(--bone);
    line-height: 1.8em;
    white-space: nowrap;
    display: block;
    font-size: 1em;
}

.registrationHeader :is(a,button):hover {
    background-color: var(--tea-green);
    color: var(--oninx);
}

.registrationHeader .linkList {
    gap: 1em;
}

.profileButtonWithText {
    padding: 0 1em;
    border-radius: 0.5em;
    background-color: var(--oninx);
    color: var(--bone);
    border: 0;
}

.profileButtonWithIcon {
    border-radius: 2.0em;
    font-size: 1.2em;
    padding: 0 0.5em;
}

.nav {
    padding: 0 2em;
    height: var(--nav-height);
    box-shadow: 0 0 2px 0px var(--bone);
    border-bottom: 3px solid var(--oninx);
}

.nav a {
    line-height: var(--nav-height);
}

.nav a:hover {
    box-shadow: 0px 1px 0px 0px white;
    background-color: var(--earie-black);
}


</style>

<style>

#app-main-nav .router-link-exact-active {
    box-shadow: 0px 1px 0px 0px white;
    background-color: var(--earie-black);
}

</style>
