export type Post = {
    id: number
    title: string
    slug: string
    views_count: number
    comments_count: number
    stars: number
    created_at: string
    updated_at: string

    user_id: number
    category_id: number

    body?: string
    excerpt: string,

    author: {
        id: number,
        username: string,
        image: string,
    },

    category: {
        id: number,
        title: string,
        slug: string,
    }
}
