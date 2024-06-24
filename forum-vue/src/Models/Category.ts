export type ApiCategoryRow = {
    id: number, 
    title: string, 
    slug: string,
    parent_id: number | null,
    posts_count: number,
    comments_count: number,

    post_title: string | null,
    post_slug: string | null,
}

export type PostResume = {
    title: string,
    slug: string,
}

export type SubCategory = {
    id: number,
    title: string,
    slug: string,
    post?: PostResume,
    posts_count: number,
    comments_count: number,
    // children: SubCategory[]
}

export type Category = {
    id: number,
    title: string,
    slug: string,
    children: SubCategory[]
}

export type CategoriesJson = {
    categories: Category[]
}

export function convertRowsToNestedJson(rows: ApiCategoryRow[]): CategoriesJson {
    const nestedJson: CategoriesJson = { categories: [] }
    const categories: Record<number, Category> = {}
    // WIth just two levels don't need this
    // const subCategories: Record<number, SubCategory> = {}

    for (const row of rows) {
        if (!row.parent_id) {
            const category: Category = {
                id: row.id,
                slug: row.slug,
                title: row.title,
                children: [],
            }
            nestedJson.categories.push(category)
            categories[row.id] = category
        } else {
            const subCategory: SubCategory = {
                id: row.id,
                slug: row.slug,
                title: row.title,
                comments_count: row.comments_count,
                posts_count: row.posts_count,
            }

            if (row.post_title)
                subCategory.post = {
                    title: row.post_title,
                    slug: row.post_slug!,
                }

            categories[row.parent_id].children.push(subCategory)
            // subCategories[row.id] = subCategory
        }
    }

    return nestedJson
}
