export interface Game {
    background_image: string,
    name: string,
    rating: number,
    released: string,
    short_screenshots: Array<Screenshot>
}

export interface Screenshot {
    id: number
    image: string
}