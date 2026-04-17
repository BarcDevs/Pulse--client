export const authQueryKeys = {
    getMe: ['auth', 'me'] as const,
    profile: ['profile'] as const
}

export const checkInQueryKeys = {
    all: ['checkIn'] as const,
    stats: ['checkIn', 'stats'] as const
}

export const forumQueryKeys = {
    all: ['forum'] as const,
    posts: ['forum', 'posts'] as const,
    post: (id: string) => ['forum', 'posts', id] as const,
    replies: (postId: string) =>
        ['forum', 'posts', postId, 'replies'] as const,
    tags: ['forum', 'tags'] as const
}

export const insightsQueryKeys = {
    all: ['insights'] as const,
    stats: ['insights', 'stats'] as const,
    patterns: ['insights', 'patterns'] as const
}

export const profileQueryKeys = {
    all: ['profile'] as const,
    options: ['profile', 'options'] as const,
    interests: ['profile', 'interests'] as const,
    activities: ['profile', 'activities'] as const
}

export const recoveryGoalsQueryKeys = {
    all: ['recoveryGoals'] as const,
    goal: (id: string) =>
        ['recoveryGoals', id] as const,
    milestones: (goalId: string) =>
        ['recoveryGoals', goalId, 'milestones'] as const
}
