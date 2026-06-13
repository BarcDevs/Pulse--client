export const ENDPOINTS = {
    auth: {
        login: '/auth/login',
        signup: '/auth/signup',
        logout: '/auth/logout',
        csrf: '/auth/csrf',
        me: '/auth/me',
        refresh: '/auth/refresh',
        changeEmail: '/auth/change-email',
        confirmEmailChange: '/auth/confirm-email-change'
    },
    users: {
        me: '/users/me',
        password: '/users/password'
    },
    forum: {
        posts: '/forum/posts',
        savedPosts: '/forum/posts/saved',
        post: (postId: string) => `/forum/posts/${postId}`,
        likePost: (postId: string) => `/forum/posts/${postId}/like`,
        savePost: (postId: string) => `/forum/posts/${postId}/save`,
        sharePost: (postId: string) => `/forum/posts/${postId}/share`,
        replies: (postId: string) =>
            `/forum/posts/${postId}/replies`,
        reply: (
            postId: string,
            replyId: string
        ) => `/forum/posts/${postId}/replies/${replyId}`,
        likeReply: (
            postId: string,
            replyId: string
        ) => `/forum/posts/${postId}/replies/${replyId}/like`,
        recommendations: '/forum/recommendations',
        tags: '/forum/tags',
        tagsUnknown: '/forum/tags/unknown',
        postCategories: '/forum/posts/categories'
    },
    checkIn: {
        base: '/check-in',
        stats: '/check-in/stats'
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