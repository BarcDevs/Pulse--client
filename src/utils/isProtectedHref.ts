import { protectedRoutes } from '@/constants/proxyRoutes'

/** True when the link leads to a page that needs a signed-in user */
export const isProtectedHref = (href: string): boolean => {
    const path = href.split(/[?#]/)[0]

    return protectedRoutes.some(
        (route) => path === route || path.startsWith(`${route}/`)
    )
}
