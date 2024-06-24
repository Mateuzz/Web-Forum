<script setup lang="ts">

import type { User } from '@/api/auth.js';
import { RouterLink } from 'vue-router'

defineProps<User>()

</script>

<template>
    <div class="flowV" :class="$style.memberCard">
        <div :class="$style.memberPhotoWrapper">
            <img src="https://picsum.photos/100">
        </div>
        <h2>
            <RouterLink :to="{ name: 'user-profile', params: { id: String($props.id) }}" :class="$style.memberLink">
                {{ $props.username }}
            </RouterLink>
        </h2>
        <div>Member since 10/20/2024</div>
        <div style="font-weight: bold; color: var(--tea-green)"> {{ $props.status }} </div>
        <div> {{ $props.posts_published }} Posts published</div>
        <div>Donations: US${{ Number($props.donations).toFixed(2) }}</div>
        <div v-if="$props.type === 'staff'" style="font-weight: bold; color: var(--color-secondary)">Staff Member</div>
    </div>
</template>

<style module>

.memberPhotoWrapper > img {
    border-radius: 100px;
}

.memberCard {
    font-size: 0.9em;
    background-color: var(--earie-black);
    text-align: center;
    --flow-v-space: 0.5em;
    border-radius: 2em;
    padding: 1em 0.5em;
}

.memberLink:hover {
    color: var(--paynes-gray);
}

</style>
