<script setup lang="ts">

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import UserForm from '@/components/UserForm.vue';
import AppFormGroup from '@/components/AppFormGroup.vue';
import AppFormGroupSelect from '@/components/AppFormGroupSelect.vue'
import ErrorBox from '@/components/ErrorBox.vue';

import type { AppInputInstance, AppSelectInstance } from '@/models/AppForm.js';
import type { ApiCategoryRow, CategoriesJson } from '@/Models/Category.js';
import type { Post } from '@/Models/Post.js';

import { Auth } from '@/api/auth.js';

import { onMounted, ref } from 'vue';
import { getResourcePath } from '@/api/Api.js'
import { convertRowsToNestedJson } from '@/Models/Category.js';
import { authFetch, fetchJson } from '@/api/Fetch.js'
import { useRouter } from 'vue-router'
import { lastPostState } from '@/state/lastPost.js'

type PostCreatedResponse = {
    message: string,
    post?: Post,
}

onMounted(() => {
    // @ts-ignore
    $('#summernote').summernote({
        placeholder: 'Create your post',
        tabsize: 4,
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']]
        ]
    });
})

const router = useRouter()

const categoriesJson = ref<CategoriesJson>()
const error = ref('')

const categoryRef = ref<AppSelectInstance>()
const titleRef = ref<AppInputInstance>()
const excerptRef = ref<AppInputInstance>()

fetchCategories()

function fetchCategories() {
    fetchJson(getResourcePath('category'))
        .then(json => categoriesJson.value = convertRowsToNestedJson(Object.values(json as ApiCategoryRow[])))
        .catch(e => error.value = "Failed to fetch categories" + (e.message || e))
}

function submitPost() {
    const editable = document.querySelector('.note-editable')

    const body = editable?.innerHTML
    const categoryId = categoryRef?.value.model
    const title = titleRef?.value.model
    const excerpt = excerptRef?.value.model

    if (!body || !categoryId || !title || !excerpt)
        return

    const data = new FormData()

    data.append('body', body)
    data.append('title', title)
    data.append('category_id', categoryId)
    data.append('excerpt', excerpt)

    fetchJson(getResourcePath('post'), {
        method: 'post',
        body: data
    }, authFetch)
        .then(json => {
            lastPostState.value = (json as PostCreatedResponse).post
            router.push({ name: 'post', params: { slug: lastPostState.value!.slug } })
        })
        .catch(e => {
            if (!Auth.userInstance.value && confirm("You are not authenticated. Redirect to login page?"))
                router.push({ name: 'login' })
            else
                error.value = e.json.message || e.statusText
        })
}
    

</script>

<template>
    <AppHeader />

    <main class="container" id="create-post-main">
        <div :class="$style.editorContainer">
            <div id="summernote">
            </div>
        </div>

        <ErrorBox :error="error"/>

        <UserForm :input-refs="[titleRef, categoryRef]" @on-submit="submitPost" :class="$style.editorMeta" v-if="categoriesJson" id="create-post-meta"
            submitName="Submit Post">

            <AppFormGroup
                label="Title"
                id="title"
                name="title"
                v-model="titleRef"
                required
                maxlength="100"/>

            <AppFormGroup
                label="Excerpt"
                id="excerpt"
                name="excerpt"
                v-model="excerptRef"
                required
                maxlength="255"/>

            <AppFormGroupSelect label="Category" id="category" name="category" v-model="categoryRef" required>
                <template v-if="categoriesJson">
                    <optgroup v-for="category in categoriesJson.categories" :label="category.title">
                        <option v-for="subCategory in category.children" :value="subCategory.id"> {{ subCategory.title }}</option>
                    </optgroup>
                </template>
            </AppFormGroupSelect>

        </UserForm>
    </main>

    <AppFooter />
</template>

<style module>

.editorContainer {
    background-color: white;
}

</style>

<style>

#create-post-meta {
    max-width: 30em;
    padding: 1em;
    margin-top: 1em;
    border-radius: 0.5em;
    display: block;
    box-shadow: 0 0 2px 0 var(--bone);
}

#create-post-meta .user-form-title {
    margin-bottom: 0.3em;
    font-size: 1.75em;
}

#create-post-meta .app-form-group ~ * {
    margin-top: 1em;
}

</style>

