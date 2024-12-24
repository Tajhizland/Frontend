export type VlogPageResponse = {
    relatedVlogs: { data : VlogResponse[] };
    vlog:VlogResponse;
}
export type VlogResponse = {
    id: number,
    title: string;
    url: string;
    description: string;
    video: string;
    poster: string;
    status: number;
    categoryId: number;
    view: number;
    created_at: string,
    updated_at: string,
}
