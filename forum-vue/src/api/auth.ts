import cookies from "@/data/cookies.js";
import { getCookie } from "@/util/cookie.js";
import { ref } from "vue";
import { getResourcePath } from "./Api.js";
import { authFetch, sessionFetch } from "./Fetch.js";

export type User = {
    id: Number,
    username: string,
    email: string,
    image: string | null,
    status: 'online' | 'offline',
    type: 'admin' | 'user' | 'staff',

    donations: string,
    posts_published: Number,
    posts_views_received: Number,
    stars_received: Number,

    last_activity: string,
    created_at: string,
    updated_at: string,
}

export type ValidationResponse = {
    message: string,
    errors?: {
        [index: string]: string[]
    }
    user?: User
    token?: string,
}

export type AuthResult = {
    message?: string,
    errors?: {
        [index: string]: string[]
    }
}

export class Auth {
    public static userInstance = ref<User>()
    public static apiToken = ref<string>()
    public static rememberMeCookieDuration = 60 * 24 * 3650

    static async rememberLogin(): Promise<AuthResult> {
        const url = getResourcePath('login')
        let token = getCookie(cookies.loginToken)

        if (!token)
            return {
                message: "Could not make login: Login cookie not saved",
            }

        try {
            const res = await sessionFetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })

            const json = await res.json()

            if (json.user) {
                this.saveUser(json, false)
                return {}
            }

            return {
                message: json.message,
                errors: json.errors
            }
        } catch (e) {
            return {
                message: "Could not make login: " + (e as Error).message,
            }
        }
    }

    static async login(email: string, password: string): Promise<AuthResult> {
        const url = `${getResourcePath('login')}`
        const data = new FormData()

        data.append('email', email)
        data.append('password', password)

        try {
            const res = await sessionFetch(url, {
                method: 'POST',
                body: data,
            })

            const json = await res.json() as ValidationResponse

            if (json.user) {
                this.saveUser(json, true)
                return {}
            }

            return {
                message: json.message,
                errors: json.errors,
            }
        } catch (e) {
            return {
                message: (e as Error).message
            }
        }
    }

    static async signup(username: string, email: string, password: string): Promise<AuthResult> {
        const url = getResourcePath('user')
        const data = new FormData()

        data.append('username', username)
        data.append('email', email)
        data.append('password', password)

        try {
            const res = await sessionFetch(url, {
                method: 'POST',
                body: data,
            })

            const json = await res.json() as ValidationResponse

            if (json.user) {
                this.saveUser(json, true)
                return {}
            }

            return {
                message: json.message,
                errors: json.errors
            }
        } catch (e) {
            return {
                message: 'Could not create User:' + (e as Error).message,
            }
        }
    }

    static async logout(): Promise<void> {
        this.deleteUser()
            
        // const url = getResourcePath('login')

        // try {
        //     const res = await authFetch(url, {
        //         method: 'delete'
        //     })

        //     this.deleteUser()

        //     if (!res.ok) {
        //         throw new Error(res.statusText)
        //     }
        // } catch (e) {
        //     console.warn("Can't tell server to logout: " + (e as Error).message)
        // }
    }

    static deleteUser() : void {
        this.userInstance.value = undefined
        this.apiToken.value = undefined
        document.cookie = `${cookies.loginToken}=;max-age=-1`
    }

    private static saveUser(json: ValidationResponse, remember = false): void  {
        this.userInstance.value = json.user
        this.apiToken.value = json.token
        if (remember)
            document.cookie = `${cookies.loginToken}=${this.apiToken.value};max-age=${this.rememberMeCookieDuration}`
    }
}
