export type CreateClassParams = {
    code: string
    title: string
    year: string
    period: number
}

export type UpdateClassParams = {
    code?: string
    title?: string
    year?: string
    period?: number
}