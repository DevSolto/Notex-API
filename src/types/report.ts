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

export type CreateUsersReportParams = {
    userId: string
    reportId: string
}
export type UpdateUsersReportParams = {
    viewed: boolean
}