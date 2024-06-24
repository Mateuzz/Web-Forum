<script setup lang="ts">

import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/AppFooter.vue"
import AppInput from "@/components/AppInput.vue"
import MemberListItem from "@/components/MemberListItem.vue"
import ButtonIcon from "@/components/ButtonIcon.vue"
import ModifiersBar from "@/components/ModifiersBar.vue"
import ErrorBox from '@/components/ErrorBox.vue'
import PaginatedArticle from "@/components/PaginatedArticle.vue"

import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { computed, reactive, ref, watch } from "vue"
import { getResourcePath, urlQuery } from "@/api/Api.js"
import { updateRouteNoScroll } from "@/util/route.js"
import { useRoute } from "vue-router"

const route = useRoute()

const modifiers = reactive({
    order: 'latest',
    'results-per-page': 15,
    search: '',
})

const searchModel = ref('')
const error = ref('')

const url = computed(() => `${getResourcePath('user')}?${urlQuery(modifiers)}`)

watch(modifiers, () => {
    const query = Object.assign({...route.query}, modifiers)
    updateRouteNoScroll(route.path, query)
})

</script>
<template>
    <AppHeader />
    
    <div class="container" :class="$style.wrapper">

        <main :id="$style.memberListMain" class="flowV">

            <ModifiersBar>

                <div>
                    <label>Rank Members By</label>
                    <select v-model="modifiers.order">
                        <option value="latest">Recent Accounts</option>
                        <option value="oldest">Old Accounts</option>
                        <option value="posts-published">Posts Published</option>
                        <option value="views-received">Popular</option>
                        <option value="donations-given">Donations</option>
                    </select>
                </div>

                <div>
                    <label>Results per Page</label>
                    <select v-model="modifiers['results-per-page']">
                        <option>15</option>
                        <option>30</option>
                        <option>50</option>
                        <option>100</option>
                        <option>500</option>
                    </select>
                </div>

                <form @submit.prevent="modifiers.search = searchModel">
                    <label>Search</label>

                    <AppInput type="search"
                              placeholder="Search"
                              name="search"
                              v-model="searchModel"/>
                        
                        <ButtonIcon 
                            type="submit"
                            :icon="faSearch"/>
                </form>

            </ModifiersBar>

            <ErrorBox :error="error"/>

            <PaginatedArticle :class="$style.memberCardList"
                              :url v-slot="{ data: member }" @error="(e: string) => error = e">
                <MemberListItem v-bind="member"/>
            </PaginatedArticle>
        </main>

    </div>

    <AppFooter />
</template>

<style module>

.memberCardList {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12em, 1fr));
    gap: 1em;
}

.memberLink {
    color: var(--tea-green);
}

    @media screen and (min-width: 768px) {
        .wrapper {
            /*   grid-template-columns: 1fr 2fr; */
        }
    }

</style>
