const CHAT_INPUT_PLACEHOLDER = 'Type your question or concern here...'

const CHAT_PAGE_TITLE = 'AI Chat'

const CHAT_PAGE_SUBTITLE = 'Your supportive recovery companion'

const CHAT_BADGE = 'SAFE SPACE'

const CHAT_SUGGESTED_FOR_YOU = 'Suggested for You'

const CHAT_MESSAGES_ASSISTANT_LABEL = 'AI Chat'

const CHAT_MESSAGES_YOU_LABEL = 'You'

const CHAT_OPENING_MESSAGE = 'Hello Alex, I\'m here to support you today. How are you feeling?'

const CHAT_EXAMPLE_USER_RESTLESSNESS = 'I\'m feeling a bit restless today...'

const CHAT_AI_RESPONSE_1 = 'I understand. Restlessness is a very common part of the recovery journey. It often means your body has energy that needs direction.'

const CHAT_SUGGESTIONS = ['Try grounding exercise', 'Sleep environment tips']

const CHAT_AI_RESPONSE_2 = 'Let\'s start with the grounding exercise. It\'s a proven technique that helps calm an active mind and ground you in the present moment.'

const CHAT_SIDEBAR_NEXT_MILESTONE_LABEL = 'NEXT MILESTONE'

const CHAT_SIDEBAR_NEXT_MILESTONE_TITLE = '90 Days'

const CHAT_SIDEBAR_NEXT_MILESTONE_BADGE = '87% Complete'

const CHAT_SIDEBAR_INSIGHTS_TITLE = 'Recent Insights'

const CHAT_SIDEBAR_INSIGHTS_TIMEFRAME = 'Last 7 days'

const CHAT_SIDEBAR_EMOTIONAL_TREND_LABEL = 'Emotional Trend'

const CHAT_SIDEBAR_EMOTIONAL_TREND_TITLE = 'Improved'

const CHAT_SIDEBAR_EMOTIONAL_TREND_DESCRIPTION = 'You\'re maintaining a stable mood'

const CHAT_SIDEBAR_SLEEP_QUALITY_LABEL = 'Sleep Quality'

const CHAT_SIDEBAR_SLEEP_QUALITY_TITLE = 'Good'

const CHAT_SIDEBAR_SLEEP_QUALITY_DESCRIPTION = '6.5 hours average'

const CHAT_SIDEBAR_QUOTE = 'Recovery is not a destination, it\'s a journey.'

const CHAT_SIDEBAR_QUOTE_AUTHOR = 'Recovery Community'

const CHAT_MESSAGES_DEFAULT = [
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

export {
    CHAT_AI_RESPONSE_1,
    CHAT_AI_RESPONSE_2,
    CHAT_BADGE,
    CHAT_EXAMPLE_USER_RESTLESSNESS,
    CHAT_INPUT_PLACEHOLDER,
    CHAT_MESSAGES_ASSISTANT_LABEL,
    CHAT_MESSAGES_DEFAULT,
    CHAT_MESSAGES_YOU_LABEL,
    CHAT_OPENING_MESSAGE,
    CHAT_PAGE_SUBTITLE,
    CHAT_PAGE_TITLE,
    CHAT_SIDEBAR_EMOTIONAL_TREND_DESCRIPTION,
    CHAT_SIDEBAR_EMOTIONAL_TREND_LABEL,
    CHAT_SIDEBAR_EMOTIONAL_TREND_TITLE,
    CHAT_SIDEBAR_INSIGHTS_TIMEFRAME,
    CHAT_SIDEBAR_INSIGHTS_TITLE,
    CHAT_SIDEBAR_NEXT_MILESTONE_BADGE,
    CHAT_SIDEBAR_NEXT_MILESTONE_LABEL,
    CHAT_SIDEBAR_NEXT_MILESTONE_TITLE,
    CHAT_SIDEBAR_QUOTE,
    CHAT_SIDEBAR_QUOTE_AUTHOR,
    CHAT_SIDEBAR_SLEEP_QUALITY_DESCRIPTION,
    CHAT_SIDEBAR_SLEEP_QUALITY_LABEL,
    CHAT_SIDEBAR_SLEEP_QUALITY_TITLE,
    CHAT_SUGGESTED_FOR_YOU,
    CHAT_SUGGESTIONS,
}
