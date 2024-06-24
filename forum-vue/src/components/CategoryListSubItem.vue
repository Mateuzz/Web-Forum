<script setup lang="ts">

import type { SubCategory } from '@/Models/Category.js';
import { RouterLink } from 'vue-router';

const props = defineProps<SubCategory>()

</script>

<template>
    <div :class="$style.categoryListSubItem">
        <div :class="$style.logoWrapper">
            <img src="@img/main_icon.webp">
        </div>

        <div :class="$style.subCategoryContent" class="flowV">
            <div :class="$style.subCategoryContentInfo" class="flowV">
                <h2>
                    <RouterLink :to="{ name: 'posts-by-category', query: { 'category-name': $props.title }, params: { slug: $props.slug }}">
                    {{ $props.title }}
                    </RouterLink>
                </h2>

                <div :class="$style.subCategoryStats">
                    <p>Total Posts: {{ $props.posts_count }} </p>
                    <p>Messages: {{ $props.comments_count }} </p>
                </div>
            </div>

            <article :class="$style.postCard" v-if="$props.post">

                <div class="flowV">
                    <h1>
                        <RouterLink :to="{ name: 'post', params: { slug: $props.post.slug }}">
                        {{ $props.post.title }}
                        </RouterLink>
                    </h1>
                    <div :class="$style.postCardMeta">
                        <p>
                        Donald Trump
                        </p>
                        <p>
                        2 Weeks ago
                        </p>
                    </div>
                </div>
                <div :class="$style.logoWrapper">
                    <img src="https://picsum.photos/100">
                </div>
            </article>
        </div>   
    </div>
</template>

<style module>

.categoryListSubItem {
    padding: 1em;
    align-items: center;
    box-shadow: 0 0 2px 0px var(--bone);
    min-height: 8em;
    display: grid;
    grid-template-columns: 4em 1fr;
    gap: 1em;
    --flow-v-space: 0.5em;
}


.subCategoryContent h2 {
    font-size: 1.4em;
}

.logoWrapper > img {
    border-radius: 50%;
}

.postCard {
    display: grid;
    grid-template-columns: 1.00fr 0.15fr;
    gap: 1em;
}

.postCard h1 {
    font-size: 1.1em;
}

.postCard a {
    color: var(--tea-green);
}

.postCard a:hover {
    color: var(--nyanza);
}

.subCategoryContentInfo a:hover {
    color: var(--paynes-gray);
}

    @media screen and (min-width: 768px) {
        .subCategoryContent {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1em;
        }
    }

</style>
