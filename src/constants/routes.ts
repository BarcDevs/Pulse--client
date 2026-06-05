export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    VERIFY: '/verify',
    FORGOT_PASSWORD: '/forgot-password',
    CHECK_IN: '/check-in',
    CHECK_IN_NEW: '/check-in/new',
    DASHBOARD: '/dashboard',
    DAILY_CHECKIN: '/daily-checkin',
    FORUM: '/forum',
    FORUM_CREATE: '/forum/posts/create',
    COMMUNITY: '/community',
    INSIGHTS: '/insights',
    CHAT: '/chat',
    PROFILE: '/profile',
    PROFILE_SETTINGS: '/profile/settings',
    RECOVERY_GOALS: '/recovery-goals',
    CONTACT_SUPPORT: '/contact-support',
    PROGRESS: '/progress',
    STATUS: '/status',
    NETWORK_ERROR: '/network-error',
    LOGOUT: '/logout',
    HELP: '/help',
    ABOUT: '/about',
    SUPPORT: '/support',
    PRIVACY: '/privacy',
    TERMS: '/terms',
    COOKIES: '/cookies',
    loginWithRedirect: (redirect: string) =>
        `/login?redirect=${encodeURIComponent(redirect)}`,
    communityPost: (postId: string) =>
        `/community/post/${postId}`
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
