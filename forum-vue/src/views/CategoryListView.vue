<script setup lang="ts">

import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import CategoryListItem from "@/components/CategoryListItem.vue";
import ErrorBox from '@/components/ErrorBox.vue'

import type { CategoriesJson } from "@/Models/Category.js";

import { getResourcePath } from '@/api/Api';
import { convertRowsToNestedJson } from "@/Models/Category.js";
import { fetchJson } from "@/api/Fetch.js"
import { ref } from "vue";

const categoriesJson = ref<CategoriesJson>({ categories: [] })
const error = ref('')

fetchJson(`${getResourcePath('category')}?with-recent-post=true`)
    .then(json => categoriesJson.value = convertRowsToNestedJson(Object.values(json as object)))
    .catch(e => error.value = "Failed to fetch categories: " + (e.message || e))

</script>

<template>
    <AppHeader />

    <div class="container" :class="$style.wrapper">
        <main class="flowV" id="$style.main">
            <ErrorBox :error="error"/>
            <CategoryListItem v-for="category in categoriesJson.categories" v-bind="category" />
        </main>

        <aside id="$style.aside">
            This is Aside
        </aside>
    </div>

    <AppFooter />
</template>

<style module>

@media screen and (min-width: 1280px) {
    .wrapper {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 1em;
    }
}

</style>
