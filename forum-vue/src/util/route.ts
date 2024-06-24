import { urlQuery, type Query } from "@/api/Api.js";
import type { Router, RouteLocationNormalizedLoaded, RouteRecordName, RouteParams, LocationQuery } from "vue-router";

export function updateRoute({route, router, name, query, params, hash} : {
        route: RouteLocationNormalizedLoaded,
        router: Router, 
        name?: RouteRecordName | null | undefined, 
        query?: LocationQuery, 
        params?: RouteParams,
        hash?: string
}) {
    router.replace(({
        name: <NonNullable<typeof route.name>>(name || route.name),
        params: params || route.params,
        query: route.query || query,
        hash: route.hash || hash
    }))
}

export function updateRouteNoScroll(path: string, query: Query) {
    history.pushState({}, '', `${path}?${urlQuery(query)}`)
}
