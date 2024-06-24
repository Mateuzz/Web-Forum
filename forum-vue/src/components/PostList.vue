<script setup lang="ts">

import ModifiersBar from './ModifiersBar.vue';
import ButtonIcon from './ButtonIcon.vue';
import AppInput from './AppInput.vue';
import PostListItem from './PostListItem.vue';
import ErrorBox from './ErrorBox.vue'
import PaginatedArticle from "./PaginatedArticle.vue"

import type { PaginatedList } from '@/Models/PaginatedList.js';
import type { Post } from '@/Models/Post.js';
import type { PostListModifiers } from '@/Models/PostList.js';

import { computed, ref, watchEffect } from 'vue';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getResourcePath, urlQuery } from '@/api/Api.js';
import { fetchJson } from '@/api/Fetch.js'

const postListPages = ref<PaginatedList<Post>>()
const searchModel = ref('')
const error = ref('')

const modifiers = defineModel<PostListModifiers>({ required: true })
const url = computed(() => `${getResourcePath('post')}?${urlQuery(modifiers.value)}`)

</script>

<template>
    <div>
        <ModifiersBar>
            <div>
                <label for="results-per-page">Results per Page</label>
                <select v-model="modifiers['results-per-page']" id="results-per-page">
                    <option>15</option>
                    <option>30</option>
                    <option>50</option>
                    <option>100</option>
                </select>
            </div>

            <div>
                <label for="order">Order</label>
                <select v-model="modifiers.order" id="order">
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="recent-relevant">Relevant</option>
                    <option value="most-viewed">Most Views</option>
                </select>
            </div>

            <form @submit.prevent="modifiers.search = searchModel">
                <label for="search">Search</label>

                <AppInput type="search"
                          placeholder="Search"
                          name="search"
                          id="search"
                          v-model="searchModel"/>
                

                <ButtonIcon type="submit"
                            :icon="faSearch"
                            aria-label="search"/>

            </form>

        </ModifiersBar>

        <ErrorBox :error/>

        <PaginatedArticle :url v-slot=" { data: post }" @error="(e: string) => error = e">
            <PostListItem v-bind="post"/>
        </PaginatedArticle>

    </div>
</template>
