export type CreateUserParams = {
    name: string
    email: string
    cpf: string
    password: string
    role: string
    phone: string
}
export type UpdateUserParams = {
    name?: string
    email?: string
    cpf?: string
    password?: string
    role?: string
    phone?: string
    isActive?: boolean
}