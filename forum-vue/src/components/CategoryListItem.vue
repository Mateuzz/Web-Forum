<script setup lang="ts">

import CategoryListSubItem from '@components/CategoryListSubItem.vue';

import type { Category } from '@/Models/Category.js';

defineProps<Category>()

</script>

<template>
    <section :class="$style.categoryListItem">
        <h1> {{ $props.title }} </h1>

        <ul :class="$style.subCategoriesList" v-if="$props.children.length" class="flowV">
            <li v-for="subCategory in $props.children">
                <CategoryListSubItem v-bind="subCategory"/>
            </li>
        </ul>
    </section>
</template>

<style module>

.categoryListItem {
    font-size: 0.8em;
}

.categoryListItem > h1 {
    background-color: var(--earie-black);
    padding: 0.5em 1.0em;
    box-shadow: 0 0 2px 0 var(--bone);
    margin-bottom: 0.5em;
}

.subCategoriesList {
    background-color: var(--earie-black);
}

</style>
