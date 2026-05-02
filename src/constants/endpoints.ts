export const ENDPOINTS = {
    auth: {
        login: '/auth/login',
        signup: '/auth/signup',
        logout: '/auth/logout',
        csrf: '/auth/csrf',
        me: '/auth/me'
    },
    forum: {
        posts: '/forum/posts',
        post: (postId: string) => `/forum/posts/${postId}`,
        replies: (postId: string) =>
            `/forum/posts/${postId}/replies`,
        reply: (
            postId: string,
            replyId: string
        ) => `/forum/posts/${postId}/replies/${replyId}`
    },
    checkIn: {
        base: '/check-in',
        stats: '/check-in/stats'
    },
    recoveryGoals: {
        base: '/recovery-goals',
        goal: (goalId: string) =>
            `/recovery-goals/${goalId}`,
        milestones: (goalId: string) =>
            `/recovery-goals/${goalId}/milestones`,
        milestone: (
            goalId: string,
            milestoneId: string
        ) => `/recovery-goals/${goalId}/milestones/${milestoneId}`,
        completeMilestone: (
            goalId: string,
            milestoneId: string
        ) => `/recovery-goals/${goalId}/milestones/${milestoneId}/complete`
    }
}