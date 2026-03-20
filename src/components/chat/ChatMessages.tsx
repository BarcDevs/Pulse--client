'use client'

import { Bot, User } from 'lucide-react'

const messages = [
  {
    id: 1,
    role: 'assistant',
    content: "Hello Alex, I'm here to support you today. How are you feeling in your recovery journey this morning? Remember, every small step is a victory.",
    time: '8:05 AM',
  },
  {
    id: 2,
    role: 'user',
    content: "I'm feeling a bit restless today. I didn't sleep very well last night and it's making me feel slightly anxious.",
    time: '8:07 AM',
  },
  {
    id: 3,
    role: 'assistant',
    content: "I understand. Restlessness is a very common part of the process. It's your body and mind finding their new balance.\n\nWould you like to try a short grounding exercise to help with the anxiety, or perhaps we could look at some tips to improve your sleep environment for tonight?",
    time: '8:08 AM',
    suggestions: [
      { label: 'Try grounding exercise', action: 'grounding' },
      { label: 'Sleep environment tips', action: 'sleep' },
    ],
  },
  {
    id: 4,
    role: 'user',
    content: "Let's start with the grounding exercise. I need something to focus on right now.",
    time: '8:10 AM',
  },
]

export function ChatMessages() {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
        >
          {/* Avatar */}
          <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
            message.role === 'assistant' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-[var(--surface-section)]'
          }`}>
            {message.role === 'assistant' ? (
              <Bot className="h-5 w-5" />
            ) : (
              <User className="h-5 w-5 text-muted-foreground" />
            )}
          </div>

          {/* Message Content */}
          <div className={`max-w-[70%] ${message.role === 'user' ? 'text-right' : ''}`}>
            <div className={`rounded-2xl px-4 py-3 ${
              message.role === 'assistant'
                ? 'bg-[var(--surface-card)] text-foreground'
                : 'bg-primary text-primary-foreground'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {message.content}
              </p>
            </div>

            {/* Suggestions */}
            {message.suggestions && (
              <div className="flex flex-wrap gap-2 mt-3">
                {message.suggestions.map((suggestion) => (
                  <button
                    key={suggestion.action}
                    className="px-4 py-2 rounded-full border border-primary text-primary text-sm font-medium hover:bg-primary/5 transition-colors"
                  >
                    {suggestion.label}
                  </button>
                ))}
              </div>
            )}

            {/* Timestamp */}
            <p className={`text-xs text-muted-foreground mt-2 ${
              message.role === 'user' ? 'text-right' : ''
            }`}>
              {message.role === 'assistant' ? 'Assistant' : 'You'} - {message.time}
            </p>
          </div>
        </div>
      ))}

      {/* Suggested Prompts */}
      <div className="pt-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
          Suggested For You
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            'How can I improve my sleep?',
            'Suggest a 5-min stretching routine',
            'Recovery-friendly meal ideas',
          ].map((prompt) => (
            <button
              key={prompt}
              className="px-4 py-2 rounded-full bg-[var(--surface-section)] text-sm text-muted-foreground hover:text-foreground hover:bg-[var(--surface-section)]/80 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
