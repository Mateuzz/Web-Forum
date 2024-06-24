import { baseUrl, apiUrl } from "@/config"

export type QueryValue = string |  number | null | undefined | boolean
export type Query = Record<string, QueryValue | QueryValue[]> 

type ResourceKey = string | { value: string, api: boolean }

const resources  = {
    post: 'post',
    category: 'category',
    user: 'user',
    login: 'login',
    logout: 'logout',
    csrfToken: { value: 'csrf-token', api: false },
} as const

type ResourceName = keyof typeof resources

export function getResourcePath(name: ResourceName) {
    let value : ResourceKey = resources[name]
    let inApi = true

    if (typeof value == 'object') {
        inApi = value.api
        value = value.value
    }

    if (inApi)
        return `${apiUrl}/${value}`
    return `${baseUrl}/${value}`
}

export function urlQuery(query: Query): string {
    const url : string[] = []

    for (const [key, val] of Object.entries(query)) {
        if (val != null) {
            if (typeof val == 'object' && val instanceof Array) {
                for (const item of val) {
                    if (queryHasValue(item)) {
                        url.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(item)}`)
                    }
                }
            } else if (queryHasValue(val)) {
                url.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
            }
        }
    }

    return url.join('&')
}

function queryHasValue(o: string | number | undefined | null | boolean): o is string | number | boolean {
    if (o == null)
        return false
    if (typeof o === 'number')
        return true
    return !!o
}
