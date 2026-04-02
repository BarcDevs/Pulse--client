'use client'

import {
    useEffect
} from 'react'

import {
    usePathname,
    useRouter
} from 'next/navigation'

import {useAuth} from '@/context/AuthContext'

type SessionGuardConfig = {
    redirectTo?: string
    enabled?: boolean
}

const AUTH_ROUTES = ['/login', '/signup']

export const useRequireAuth = (
    config?: SessionGuardConfig
) => {
    const { user, isLoading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    const redirectTo = config?.redirectTo ?? '/login'
    const enabled = config?.enabled ?? true

    useEffect(() => {
        if (
            !isLoading &&
            !user &&
            enabled &&
            !AUTH_ROUTES.some(
                route => pathname.startsWith(route)
            )
        )
            router.push(redirectTo)
    }, [
        user,
        isLoading,
        pathname
    ])

    return { user, isLoading }
}
