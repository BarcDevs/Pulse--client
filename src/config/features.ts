export const FEATURES = {
    // Insights page - AI insights about recovery patterns
    insights: false,
    // Advanced analytics - behavioral patterns, predictions, summaries
    advancedInsights: false,
    // Recovery goals - user goals and milestones
    recoveryGoals: true,
    // Motivation feedback - personalized encouragement and recovery insights
    motivationFeedback: true,
    // Progress tracking - stats, charts, milestones
    progressInsights: true,
    // Community forum - post sharing and linking
    forumLinking: true,
    // Chat with AI assistant for recovery support
    chat: false,
    // Profile preferences - system privacy and notification settings
    profilePreferences: true,
    // Push/email notifications - notification delivery
    notifications: false
} as const

export type FeatureFlags = typeof FEATURES
