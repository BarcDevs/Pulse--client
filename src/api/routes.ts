/** IDs can come from the URL (Next decodes route params), so every segment is
 * encoded: `..%2F..` must not be able to steer a request to another API path.
 * Encoding leaves a bare `.` or `..` intact and the browser would resolve it
 * as a dot-segment, so those are rejected outright */
const encodeSegment = (segment: string) => {
    if (segment === '.' || segment === '..')
        throw new Error('Invalid path segment')

    return encodeURIComponent(segment)
}

const postPath = (postId: string) =>
    `/forum/posts/${encodeSegment(postId)}`

const goalPath = (goalId: string) =>
    `/recovery-goals/${encodeSegment(goalId)}`

export const ENDPOINTS = {
    auth: {
        login: '/auth/login',
        signup: '/auth/signup',
        logout: '/auth/logout',
        me: '/auth/me',
        refresh: '/auth/refresh',
        forgotPassword: '/auth/forgot-password',
        verifyResetCode: '/auth/verify-reset-code',
        resetPassword: '/auth/reset-password',
        changeEmail: '/auth/change-email',
        confirmEmailChange: '/auth/confirm-email-change'
    },
    support: {
        contact: '/support/contact'
    },
    users: {
        me: '/users/me',
        deleteCode: '/users/me/delete-code',
        password: '/users/password'
    },
    forum: {
        posts: '/forum/posts',
        savedPosts: '/forum/posts/saved',
        post: postPath,
        likePost: (postId: string) => `${postPath(postId)}/like`,
        savePost: (postId: string) => `${postPath(postId)}/save`,
        sharePost: (postId: string) => `${postPath(postId)}/share`,
        replies: (postId: string) =>
            `${postPath(postId)}/replies`,
        reply: (
            postId: string,
            replyId: string
        ) => `${postPath(postId)}/replies/${encodeSegment(replyId)}`,
        likeReply: (
            postId: string,
            replyId: string
        ) => `${postPath(postId)}/replies/${encodeSegment(replyId)}/like`,
        recommendations: '/forum/recommendations',
        tags: '/forum/tags',
        tagsUnknown: '/forum/tags/unknown',
        postCategories: '/forum/posts/categories'
    },
    checkIn: {
        base: '/check-in',
        stats: '/check-in/stats',
        item: (checkInId: string) =>
            `/check-in/${encodeSegment(checkInId)}`
    },
    profile: {
        base: '/profile',
        listActivities: '/profile/list/activities'
    },
    insight: {
        observation: '/insight/observation'
    },
    recoveryGoals: {
        base: '/recovery-goals',
        stats: '/recovery-goals/stats',
        goal: goalPath,
        milestones: (goalId: string) =>
            `${goalPath(goalId)}/milestones`,
        milestone: (
            goalId: string,
            milestoneId: string
        ) => `${goalPath(goalId)}/milestones/${encodeSegment(milestoneId)}`,
        completeMilestone: (
            goalId: string,
            milestoneId: string
        ) => `${goalPath(goalId)}/milestones/${encodeSegment(milestoneId)}/complete`
    }
}