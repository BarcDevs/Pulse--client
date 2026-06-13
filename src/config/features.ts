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
    // Export progress to PDF - deferred feature
    exportPdf: false,
    // Share progress - share recovery progress card as image
    shareProgress: true,
    // Community forum - post sharing and linking
    forumLinking: true,
    // Chat with AI assistant for recovery support
    chat: false,
    // Community mentors
    mentors: false,
    // Profile preferences - system privacy and notification settings
    profilePreferences: true,
    // Push/email notifications - notification delivery
    notifications: false,
    // Daily Activity Preferences section in profile
    activityPreferences: true,
    // Energy metric in wellness card (no API data yet)
    wellnessEnergy: false,
    // Dark mode theme toggle
    darkMode: false,
    // User level/badge in profile (no API data yet)
    profileLevel: false,
    // Profile image upload - deferred to scaling phase
    profileImageUpload: false,
    // Settings tabs — gated individually
    settingsNotifications: false,
    settingsPrivacy: false,
    settingsSecurity: true,
    settingsPreferences: true,
    // Footer social media links - hidden until real accounts are ready
    socialLinks: false
} as const

export type FeatureFlags = typeof FEATURES
