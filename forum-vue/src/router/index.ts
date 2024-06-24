import { createRouter, createWebHistory } from 'vue-router'
import CategoryListView from '@/views/CategoryListView.vue'
import PostListView from '@/views/PostListView.vue'
import PostView from '@/views/PostView.vue'
import FormLoginView from '@/views/FormLoginView.vue'
import FormRegisterView from '@/views/FormRegisterView.vue'
import MemberListView from '@/views/MemberListView.vue'
import PostCreateView from '@/views/PostCreateView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    scrollBehavior: (to, from, savedPosition) => {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            }
        }

        if (savedPosition)
            return savedPosition

        return { top: 0 }
    },

    routes: [
        {
            path: '/',
            name: 'home',
            component: CategoryListView,
            alias: '/home',
        },
        {
            path: '/posts',
            name: 'posts',
            component: PostListView,
        },
        {
            path: '/categories/:slug',
            name: 'posts-by-category',
            component: PostListView,
        },
        {
            path: '/posts/create',
            name: 'post-create',
            props: true,
            component: PostCreateView
        },
        {
            path: '/posts/:slug',
            name: 'post',
            props: true,
            component: PostView,
        },
        {
            path: '/login',
            name: 'login',
            component: FormLoginView,
        },
        {
            path: '/signup',
            name: 'signup',
            component: FormRegisterView,
        },
        {
            path: '/members',
            name: 'members',
            component: MemberListView,
        },
        {
            path: '/members/:id(\\d+)',
            name: 'user-profile',
            component: () => import('@/views/UserProfileView.vue'),
            props: true,
        },
    ]
})


// router.beforeEach((to, from) => {
// })

export default router
