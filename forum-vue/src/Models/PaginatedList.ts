export type PaginatedList<Model> = {
    current_page: number;
    data: Array<Model>;
    first_page_url: string;
    last_page_url: number;
    from: number;
    to: number;
    links: Array<{
        url: string,
        label: string,
        active: boolean,
    }>;
    path: string;
    per_page: number;
    total: number;
}

