import type { UserProfile } from '@/types/profile'

export type Role = 'USER' | 'ADMIN'

export type User = {
    id: string
    firstName: string
    lastName: string
    username: string
    email: string
    role: Role
    passwordUpdatedAt?: string
    createdAt: string
    deletedAt?: string | null
    profile?: UserProfile
}

export type PartialUser = {
    id: string
    firstName: string
    lastName: string
    username: string
    profile?: UserProfile
}
