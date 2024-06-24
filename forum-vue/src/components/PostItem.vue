<script setup lang="ts">
import type { Post } from '@/Models/Post.js';

import {ref} from 'vue';

defineProps<Post>()

const article = ref<HTMLElement>()

defineExpose({ article })

</script>

<template>
    <article :class="$style.article" class="flowV" ref="article">
        <h1> {{ $props.title }}</h1>
        <p><time :class="$style.date"> {{ new Date($props.created_at) }} </time> </p>
        <div :class="$style.authorCard">
            <div>
                <img src="https://picsum.photos/50">
            </div>

            <p> {{ $props.author.username }} </p>
        </div>

        <div v-html="$props.body" :class="$style.body" class="flowV">

        </div>
    </article>
</template>

<style module>

.date {
    font-size: 0.9rem;
}

.authorCard {
    display: flex;
    align-items: center;
    gap: 0.8em;
}

.authorCard img {
    border-radius: 100%;
}

.article {
    max-width: 40em;
    border-radius: 0.5em;
    --flow-v-space: 1em;
}

.body {
    text-wrap: wrap;
    overflow-wrap: break-word;
    --flow-v-space: 0.5em;
}

</style>
