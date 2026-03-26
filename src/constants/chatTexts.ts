export const CHAT_INPUT_PLACEHOLDER = 'Type your question or concern here...'

export const CHAT_PAGE_TITLE = 'AI Chat'

export const CHAT_PAGE_SUBTITLE = 'Your supportive recovery companion'

export const CHAT_BADGE = 'SAFE SPACE'

export const CHAT_SUGGESTED_FOR_YOU = 'Suggested for You'

export const CHAT_MESSAGES_ASSISTANT_LABEL = 'AI Chat'

export const CHAT_MESSAGES_YOU_LABEL = 'You'

export const CHAT_OPENING_MESSAGE = `Hello Alex, I'm here to support you today. How are you feeling?`

export const CHAT_EXAMPLE_USER_RESTLESSNESS = `I'm feeling a bit restless today...`

export const CHAT_AI_RESPONSE_1 = 'I understand. Restlessness is a very common part of the recovery journey. It often means your body has energy that needs direction.'

export const CHAT_SUGGESTIONS = ['Try grounding exercise', 'Sleep environment tips']

export const CHAT_AI_RESPONSE_2 = `Let's start with the grounding exercise. It's a proven technique that helps calm an active mind and ground you in the present moment.`

export const CHAT_SIDEBAR_NEXT_MILESTONE_LABEL = 'NEXT MILESTONE'

export const CHAT_SIDEBAR_NEXT_MILESTONE_TITLE = '90 Days'

export const CHAT_SIDEBAR_NEXT_MILESTONE_BADGE = '87% Complete'

export const CHAT_SIDEBAR_INSIGHTS_TITLE = 'Recent Insights'

export const CHAT_SIDEBAR_INSIGHTS_TIMEFRAME = 'Last 7 days'

export const CHAT_SIDEBAR_EMOTIONAL_TREND_LABEL = 'Emotional Trend'

export const CHAT_SIDEBAR_EMOTIONAL_TREND_TITLE = 'Improved'

export const CHAT_SIDEBAR_EMOTIONAL_TREND_DESCRIPTION = `You're maintaining a stable mood`

export const CHAT_SIDEBAR_SLEEP_QUALITY_LABEL = 'Sleep Quality'

export const CHAT_SIDEBAR_SLEEP_QUALITY_TITLE = 'Good'

export const CHAT_SIDEBAR_SLEEP_QUALITY_DESCRIPTION = '6.5 hours average'

export const CHAT_SIDEBAR_QUOTE = `"Recovery is not a destination, it's a journey"`

export const CHAT_SIDEBAR_QUOTE_AUTHOR = 'Recovery Community'

export const CHAT_MESSAGES_DEFAULT = [
    {
        id: '1',
        role: 'assistant' as const,
        content: CHAT_OPENING_MESSAGE,
        timestamp: '08:30 AM'
    },
    {
        id: '2',
        role: 'user' as const,
        content: CHAT_EXAMPLE_USER_RESTLESSNESS,
        timestamp: '08:32 AM'
    },
    {
        id: '3',
        role: 'assistant' as const,
        content: CHAT_AI_RESPONSE_1,
        timestamp: '08:33 AM',
        suggestions: CHAT_SUGGESTIONS
    },
    {
        id: '4',
        role: 'user' as const,
        content: CHAT_AI_RESPONSE_2,
        timestamp: '08:35 AM'
    }
]