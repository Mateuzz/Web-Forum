<script setup lang="ts">

import type { Post } from '@/Models/Post.js';
import { formatDateByString } from '@/util/date.js';

const props = defineProps<Post>()

</script> 

<template>
    <article :class="$style.postCard">
        <div :class="$style.logoWrapper">
            <img src="https://picsum.photos/90">
        </div>

        <div :class="$style.postCardContent">
            <div class="flowV">
                <h1>
                    <RouterLink :to="{ name: 'post', params: { slug: props.slug } }"> {{ props.title }}</RouterLink>
                </h1>

                <p>
                    <b> {{ props.author.username }}</b> - Posted <time> {{ formatDateByString(props.created_at) }} </time>
                </p>

                <p>
                </p>

                <p>
                    {{  $props.excerpt }}
                </p>

                <div :class="$style.postCardContentMeta" class="flowV">
                    <p>
                        Views: {{ $props.views_count }}
                    </p>

                    <p> 
                        Comments: {{ props.comments_count }}
                    </p>
                </div>
            </div>
        </div>
    </article>
</template>

<style module>
.postCard {
    display: flex;
    padding: 1em;
    gap: 20px;
    align-items: center;
    background-color: var(--earie-black);
    box-shadow: 0 0 2px 0px var(--bone);
}

.postCardContent {
    --flow-v-space: 0.25em;
}

.postCardContent a {
    color: var(--tea-green);
}

.postCardContent a:hover {
    color: var(--nyanza);
}

.logoWrapper {
    margin-right: 0.5em;
    flex-basis: 60px;
    flex-shrink: 0;
}

.logoWrapper > img {
    border-radius: 10%;
}

.postCard h1 {
    font-size: 1.1em;
}
</style>
