<script setup lang="ts">

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import PostList from '@/components/PostList.vue';
import ErrorBox from '@/components/ErrorBox.vue';

import type { User } from '@/api/auth.js';

import { formatDateByString } from '@/util/date.js';
import { ref, watch, watchEffect } from 'vue'
import { getResourcePath } from '@/api/Api.js'
import { fetchJson } from '@/api/Fetch.js'
import { useRoute } from 'vue-router'
import { updateRouteNoScroll } from '@/util/route.js'
import usePostListModifiers from '@/composables/PostList.js'
import type { PostListModifiers } from '@/Models/PostList.js'

const props = defineProps<{
    id: string
}>()

const route = useRoute()

const user = ref<User>()
const error = ref('')

const postModifiers : PostListModifiers = usePostListModifiers(route)
postModifiers.user = props.id

watchEffect(() => {
    fetchJson(`${getResourcePath('user')}/${props.id}`)
        .then(json => user.value = json as User)
        .catch(e => error.value = "Failed to fetch User: " + (e.message || e))
})

watch(postModifiers, () => {
    const query = Object.assign({...route.query}, postModifiers)
    updateRouteNoScroll(route.path, query)
})

</script>

<template>
    <AppHeader/>

    <main v-if="user" class="container">
        <ErrorBox :error="error"/>

        <div v-if="user">
            <article :class="$style.userCard" class="flowV">
                <div :class="$style.photoWrapper">
                    <img src="https://picsum.photos/100">
                </div>

                <div class="flowV" :class="$style.userInfoContent">
                    <h1> {{ user.username }} </h1>
                    <div>Member since {{ formatDateByString(user.created_at) }}</div>
                    <div> {{ user.posts_published }} Posts published</div>
                    <div>Donations: US${{ Number(user.donations).toFixed(2) }}</div>
                    <div>Stars: {{ user.stars_received }}</div>
                    <div>Posts Published: {{ user.posts_published }}</div>
                    <div>Views Received: {{ user.posts_views_received }}</div>
                </div>

            </article>

            <article :class="$style.userPostList" class="flowV">
                <h2>Posts By User</h2> 

                <PostList v-model="postModifiers" class="flowV"/>
            </article>
        </div>
    </main> 

    <AppFooter/>
</template>

<style module>

.userCard {
    text-align: center;
}

.photoWrapper img {
    width: 5em;
    border-radius: 10em;
}

</style>
