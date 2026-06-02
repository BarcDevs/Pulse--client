import type { UserProfile } from '@/types/profile'

export type Role = 'USER' | 'ADMIN'

export type User = {
    id: string
    firstName: string
    lastName: string
    username: string
    email: string
    role: Role
    dateOfBirth?: Date
    recoveryType?: string
    careProvider?: string
    passwordUpdatedAt?: string
    createdAt: string
    deletedAt?: string
    profile?: UserProfile
}

export type PartialUser = {
    id: string
    image: string | null
    user: {
        id: string
        username: string
        firstName: string
        lastName: string
    }
}
