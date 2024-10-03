export type CreateReportParams = {
    title: string
    description: string
    creatorId: string
}

export type UpdateReportParams = {
    title?: string
    description?: string
    creatorId?: string
}