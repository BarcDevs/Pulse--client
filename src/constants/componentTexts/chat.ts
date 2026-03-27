export const chatTexts = {
    inputPlaceholder: 'Type your question or concern here...',
    pageTitle: 'AI Chat',
    pageSubtitle: 'Your supportive recovery companion',
    badge: 'SAFE SPACE',
    suggestedForYou: 'Suggested for You',
    messages: {
        assistantLabel: 'AI Chat',
        youLabel: 'You',
        openingMessage: `Hello Alex, I'm here to support you today. How are you feeling?`,
        exampleUserRestlessness: `I'm feeling a bit restless today...`,
        aiResponse1: 'I understand. Restlessness is a very common part of the recovery journey. It often means your body has energy that needs direction.',
        suggestions: ['Try grounding exercise', 'Sleep environment tips'],
        aiResponse2: `Let's start with the grounding exercise. It's a proven technique that helps calm an active mind and ground you in the present moment.`
    },
    sidebar: {
        nextMilestoneLabel: 'NEXT MILESTONE',
        nextMilestoneTitle: '90 Days',
        nextMilestoneBadge: '87% Complete',
        insightsTitle: 'Recent Insights',
        insightsTimeframe: 'Last 7 days',
        emotionalTrendLabel: 'Emotional Trend',
        emotionalTrendTitle: 'Improved',
        emotionalTrendDescription: `You're maintaining a stable mood`,
        sleepQualityLabel: 'Sleep Quality',
        sleepQualityTitle: 'Good',
        sleepQualityDescription: '6.5 hours average',
        quote: `"Recovery is not a destination, it's a journey"`,
        quoteAuthor: 'Recovery Community'
    }
}

export const chatMessagesDefault = [
    {
        id: '1',
        role: 'assistant' as const,
        content: chatTexts.messages.openingMessage,
        timestamp: '08:30 AM'
    },
    {
        id: '2',
        role: 'user' as const,
        content: chatTexts.messages.exampleUserRestlessness,
        timestamp: '08:32 AM'
    },
    {
        id: '3',
        role: 'assistant' as const,
        content: chatTexts.messages.aiResponse1,
        timestamp: '08:33 AM',
        suggestions: chatTexts.messages.suggestions
    },
    {
        id: '4',
        role: 'user' as const,
        content: chatTexts.messages.aiResponse2,
        timestamp: '08:35 AM'
    }
]
