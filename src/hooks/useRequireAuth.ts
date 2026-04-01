'use client'

import {
    useEffect
} from 'react'

import {
    usePathname,
    useRouter
} from 'next/navigation'

import {useAuth} from '@/context/AuthContext'

const AUTH_ROUTES = ['/login', '/signup']

export const useRequireAuth = () => {
    const { user, isLoading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (
            !isLoading &&
            !user &&
            !AUTH_ROUTES.includes(pathname)
        ) {
            router.push('/login')
        }
    }, [
        user,
        isLoading,
        router,
        pathname
    ])

    return { user, isLoading }
}
