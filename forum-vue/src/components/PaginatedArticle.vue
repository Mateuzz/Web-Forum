<script setup lang="ts">
    import { type PaginatedList } from '@/Models/PaginatedList.js';

    import { fetchJson } from '@/api/Fetch.js'
    import { ref, watchEffect } from 'vue';
    
    const props = defineProps<{
        url: string,
    }>()

    const emit = defineEmits<{
        errorMessage: [message: string]
    }>()

    const pages = ref<PaginatedList<any>>()

    watchEffect(() => {
        fetchJson(props.url)
            .then(json => {
                emit('errorMessage', '')
                pages.value = json as PaginatedList<any>
            })
            .catch(e => {
                emit('errorMessage', e.json?.message || e.statusText || e)
            })
    })

</script>

<template>
    <ul v-if="pages?.data">
        <li v-for="page in pages.data">
            <slot :data="page"></slot>
        </li>
    </ul> 
</template>
