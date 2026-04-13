export const FEATURES = {
    // Insights page - AI-generated insights about recovery patterns
    insights: true,
    // Advanced analytics - behavioral patterns, predictions, and summaries
    advancedInsights: false,
    // Recovery goals section - user recovery goals and milestones
    recoveryGoals: true,
    // Motivation feedback - personalized encouragement and recovery insights
    motivationFeedback: true,
    // Progress tracking page - stats, charts, and recovery milestones
    progressInsights: true,
    // Community forum - post sharing and discussion linking
    forumLinking: true,
    // Chat with AI assistant for recovery support
    chat: true,
    // Profile preferences settings - system-level privacy and notification settings
    profilePreferences: false,
    // Push/email notifications - notification delivery system
    notifications: false
} as const

export type FeatureFlags = typeof FEATURES
