import type { User } from '@/types/user'

export type LoginResponse = {
    token: string
    _csrf: string
}

export type AuthResponse = {
    user: User
    _csrf: string
}