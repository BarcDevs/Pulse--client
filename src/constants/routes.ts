export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    VERIFY: '/verify',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    CHECK_IN: '/check-in',
    CHECK_IN_NEW: '/check-in/new',
    DASHBOARD: '/dashboard',
    DAILY_CHECKIN: '/daily-checkin',
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
    loginWithRedirect: (redirect: string) =>
        `/login?redirect=${encodeURIComponent(redirect)}`,
    communityPost: (postId: string) =>
        `/community/post/${postId}`
} as const

