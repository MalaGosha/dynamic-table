export type ResponseType = {
    count: number,
    next: string,
    previous?: string,
    results: ResultsType[],
    seo_title: string,
    seo_description: string,
    seo_keywords: string,
    seo_h1: string,
    noindex: boolean,
    nofollow: boolean,
    description: string,
    filters: {filters: YearsType[]},
    nofollow_collections: string[],
}

export type ResultsType = {
slug: string,
name: string,
released: string,
tba: boolean,
background_image: string,
rating: number,
rating_top: number,
ratings: RatingsType[],
ratings_count: number,
reviews_text_count: number,
added: number,
added_by_status: AddedByStatusType,
metacritic: number,
playtime: number,
suggestions_count: number,
updated: string,
user_game: null,
reviews_count: number,
saturated_color: string,
dominant_color: string,
platforms: PlatformsType[],
parent_platforms: {platform: ParentPlatformType}[],
genres: GenresType[],
stores: StoresType[],
clip?: string,
tags: TagsType[],
esrb_rating: ParentPlatformType,
short_screenshots: ScreenShotsType[]
}

export type YearsType = {
    from: number,
    to: number,
    filter: string,
    decade: number,
    years: [],
    nofollow: boolean,
    count: number
}

export type RatingsType = { 
    id: number,
    title: string,
    count: number,
    percent: number
}

export type AddedByStatusType = {
    yet: number,
    owned: number,
    beaten: number,
    toplay: number,
    dropped: number,
    playing: number
}

export type PlatformsType = {
    platform: PlatformType,
    released_at: string,
    requirements_en?: {minimum: string, recommended: string},
    requirements_ru?: string
}

export type PlatformType = {
    id: number,
    name: string,
    slug: string,
    image?: string,
    year_end?: string,
    year_start: number,
    games_count: number,
    image_background: string
}

export type ParentPlatformType = {
    id: number,
    name: string,
    slug: string
}

export type GenresType = { 
    id: number,
    name: string,
    slug: string,
    games_count: number,
    image_background: string
}

export type StoresType = {
    id: number,
    store: StoreType
}

export type StoreType = {
    id: number,
    name: string,
    slug: string,
    domain: string,
    games_count: number,
    image_background: string
}

export type TagsType = {
    id: number,
    name: string,
    slug: string,
    language: string,
    games_count: number,
    image_background: string
}

export type ScreenShotsType = {
    id: number,
    image: string
}