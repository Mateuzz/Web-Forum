<script setup lang="ts">

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import PostList from '@/components/PostList.vue'

import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { updateRouteNoScroll } from '@/util/route.js'
import usePostListModifiers from '@/composables/PostList.js'

const route = useRoute()

const postModifiers = usePostListModifiers(route)

watch(postModifiers, () => {
    const query = Object.assign({...route.query}, postModifiers)
    updateRouteNoScroll(route.path, query)
})

</script>

<template>
    <AppHeader />

    <main class="container flowV" :id="$style.postListmain">
        <h1 v-if="route.query['category-name']"> {{ route.query['category-name']}} </h1>
    
        <PostList v-model="postModifiers" class="flowV"/>
    </main>

    <AppFooter />
</template>

<style module>

.postListmain > h1 {
    padding: 0.4em 1em;
    box-shadow: 0 0 3px 0 var(--bone);
    background-color: var(--oninx);
    border-radius: 0.2em;
}

</style>
