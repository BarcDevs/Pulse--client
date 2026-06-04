export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    VERIFY: '/verify',
    FORGOT_PASSWORD: '/forgot-password',
    CHECK_IN: '/check-in',
    CHECK_IN_NEW: '/check-in/new',
    FORUM: '/forum',
    FORUM_CREATE: '/forum/posts/create',
    PROFILE_SETTINGS: '/profile/settings',
    RECOVERY_GOALS: '/recovery-goals',
    CONTACT_SUPPORT: '/contact-support',
    PROGRESS: '/progress',
    loginWithRedirect: (redirect: string) =>
        `/login?redirect=${encodeURIComponent(redirect)}`
} as const

export const ROUTE_IDS = {
    LOGIN: '/(auth)/login',
    SIGNUP: '/(auth)/signup',
    VERIFY: '/(auth)/verify',
    FORGOT_PASSWORD: '/(auth)/forgot-password'
} as const

export type RouteKey = {
    [K in keyof typeof ROUTES]
    : typeof ROUTES[K] extends string ? K : never
}[keyof typeof ROUTES]
