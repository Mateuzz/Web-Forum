import { getResourcePath } from "./Api.js"
import { Auth } from "./auth.js"

type GetCsrfTokenResponse = {
    'csrf-token': string,
}

let csrfToken : string

function getInit(init?: RequestInit) {
    if (init) {
        init.headers = init.headers ?? {}
        return init
    }

    const newInit : RequestInit = {}
    newInit.headers = {}
    return newInit
}

async function newCsrfToken() : Promise<string> {
    const res = await apiFetch(getResourcePath('csrfToken'))
    if (!res.ok)
        throw new Error("Failed to get CSRF Cookie: " + res.statusText)

    // const cookie = getCookie('XSRF-TOKEN')
    // if (!cookie)
    //     throw new Error("Failed to get CSRF Cookie from browser")
    // return cookie
    
    const json = await res.json() as GetCsrfTokenResponse
    return json['csrf-token'];
}

async function getCsrfToken() : Promise<string> {
    return csrfToken ?? (csrfToken = await newCsrfToken())
}

export async function apiFetch(url: string, init?: RequestInit) : Promise<Response> {
    init = getInit(init)
    // @ts-ignore
    init.headers.Accept = 'application/json'
    // @ts-ignore
    init.headers.withCredentials = 'true'

    return fetch(url, init)
}

export function fetchJson(
    url: string, 
    init?: RequestInit, 
    fetchFunction: (url: string, init?: RequestInit) => Promise<Response> = apiFetch)
{
    return new Promise(async (resolve, reject) => {
        const res = await fetchFunction(url, init)
        const json = await res.json()

        if (!res.ok)  {
            reject({json, statusText: res.statusText})
        }

        resolve(json)
    })
}

export async function sessionFetch(url: string, init?: RequestInit) : Promise<Response> {
    let token = await getCsrfToken()

    init = getInit(init)

    // @ts-ignore
    init.headers['X-XSRF-TOKEN'] = token;
    const res = await apiFetch(url, init)

    if (res.status !== 419) {
        return res
    }
    
    token = await newCsrfToken()

    // @ts-ignore
    init.headers['X-XSRF-TOKEN'] = token;

    return apiFetch(url, init)
}

export async function authFetch(url: string, init?: RequestInit) : Promise<Response> {
    if (!Auth.userInstance.value) { 
        throw new Error("User not authenticated")
    }

    init = getInit(init)
    // @ts-ignore
    init.headers['Authorization'] = `Bearer ${Auth.apiToken.value}`
    const res = await sessionFetch(url, init)

    if (res.status !== 401) {
        return res
    }

    Auth.deleteUser()

    throw new Error("User not authenticated")
}
