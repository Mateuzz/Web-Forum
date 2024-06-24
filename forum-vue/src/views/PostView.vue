<script setup lang="ts">

import { onUnmounted, ref, watch } from 'vue';

import PostItem from '@components/PostItem.vue'
import HeadingsNavigator from '@/components/HeadingsNavigator.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import ErrorBox from '@/components/ErrorBox.vue'

import type { Post } from '@/Models/Post.js';

import { fetchJson } from '@/api/Fetch.js'
import { getResourcePath } from '@/api/Api.js';
import { lastPostState } from '@/state/lastPost.js'

const props = defineProps<{
    slug?: string,
}>()

const post = ref<Post>()
const postRef = ref<InstanceType<typeof PostItem>>()
const error = ref('')

watch(props, () => {
    if (lastPostState.value)
        post.value = lastPostState.value
    else
        fetchJson(`${getResourcePath('post')}/${props.slug}`)
            .then(json => post.value = json as Post)
            .catch(e => error.value = "Failed to fetch post: " + (e.message || e))
}, { immediate: true })

onUnmounted(() => {
    lastPostState.value = undefined
})

</script>

<template>
    <AppHeader/>
    <div :class="$style.wrapper" class="container">

        <ErrorBox :error="error"/>

        <div :class="$style.article" v-if="post">
            <main :id="$style.postMain">
                <PostItem v-bind="post" ref="postRef"/>
            </main>

            <aside :id="$style.postNavAside">
                <div>
                    <h2> Content Guide </h2>
                    <HeadingsNavigator 
                    v-if="postRef?.article"
                    :class="$style.headingsNavigator"
                    :article="postRef.article" />
                </div>
            </aside>
        </div>
    </div>
    <AppFooter/>
</template>

<style module>

.wrapper {
    margin-top: 1em;
}

.article {
    display: grid;
    grid-template-columns: 15em 1fr;
    grid-template-areas: "aside main";
    gap: 2em;
}

#postMain {
    grid-area: main;
    margin-top: 1em;
}

#postNavAside {
    border-right: 2px solid var(--bone);
    margin-top: 1em;
}

#postNavAside ::-webkit-scrollbar {
    display: none;
}

#postNavAside > div {
    position: sticky;
    top: var(--header-height);
    height: calc(100vh - var(--header-height));
    overflow-y: scroll;
}

.headingsNavigator {
    border-left: 1px solid var(--bone);
    margin-top: 1em;
}

</style>

<style>

.headings-navigator-link {
    display: block;
    font-size: 0.9em;
    padding: 0.5em 1em;
    color: var(--bone);
}

.headings-navigator-link:hover,
.headings-navigator-link-active {
    color: var(--tea-green);
    font-weight: bold;
    border-left: 1px solid var(--bone);
}

.headings-navigator-link.level-2 {
    text-indent: 0.2em;   
}

</style>
