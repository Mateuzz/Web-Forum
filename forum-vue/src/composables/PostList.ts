import { reactive } from "vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";

export default function usePostListModifiers(route: RouteLocationNormalizedLoaded) {
    return reactive({
        category: route.params['slug'] as string,
        search: route.query.search as string,
        'results-per-page': route.query['results-per-page'] as string || '15',
        order: route.query.order as string || 'latest',
        user: ''
    })
}
