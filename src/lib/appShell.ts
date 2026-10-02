import { isProtectedHref } from '@/utils/isProtectedHref'

import { ROUTES } from '@/constants/routes'

export type AppShellMode = 'none' | 'app' | 'bare'

const shelllessRoutes: string[] = [
    ROUTES.HOME,
    ROUTES.LOGIN,
    ROUTES.SIGNUP,
    ROUTES.VERIFY,
    ROUTES.FORGOT_PASSWORD,
    ROUTES.RESET_PASSWORD
]

export const getAppShellMode = (
    pathname: string,
    isSignedIn: boolean
): AppShellMode => {
    if (shelllessRoutes.includes(pathname)) {
        return 'none'
    }

    if (isProtectedHref(pathname) || isSignedIn) {
        return 'app'
    }

    return 'bare'
}
