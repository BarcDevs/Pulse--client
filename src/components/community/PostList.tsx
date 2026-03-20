'use client'

import { useState } from 'react'

import { Bookmark, MessageSquare, Play,Share2 } from 'lucide-react'

import { cn } from '@/lib/utils'

const tabs = ['Popular', 'Recent', 'Unanswered']

const posts = [
  {
    id: 1,
    category: 'Success Stories',
    categoryColor: 'bg-purple-100 text-purple-700',
    author: 'Marcus T.',
    timeAgo: '3 hours ago',
    title: 'My first 90 days: Finding peace in the routine of early mornings.',
    content: "I used to dread the sunrise because it meant another day of struggle. Now, my 5 AM tea and meditation are the anchor of my day. If you're in the first...",
    votes: 47,
    replies: 18,
    hasMedia: false,
  },
  {
    id: 2,
    category: 'Support Groups',
    categoryColor: 'bg-blue-100 text-blue-700',
    author: 'Sarah Jenkins',
    timeAgo: '5 hours ago',
    title: 'Managing social anxiety during family gatherings this weekend',
    content: "Does anyone have tips for navigating conversations about 'why I'm not drinking' with pushy relatives? Feeling a bit nervous about the upcoming...",
    votes: 123,
    replies: 42,
    hasMedia: false,
  },
  {
    id: 3,
    category: 'Yoga & Movement',
    categoryColor: 'bg-emerald-100 text-emerald-700',
    author: 'YogaCoach_Ben',
    timeAgo: '8 hours ago',
    title: 'Gentle 10-minute flow for releasing neck tension.',
    content: '',
    votes: 89,
    replies: 24,
    hasMedia: true,
  },
]

export function PostList() {
  const [activeTab, setActiveTab] = useState('Popular')

  return (
    <div className="rounded-2xl bg-[var(--surface-card)] overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-6 py-4 text-sm font-medium transition-colors',
              activeTab === tab
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="divide-y divide-border">
        {posts.map((post) => (
          <div key={post.id} className="p-6 hover:bg-[var(--surface-section)]/50 transition-colors">
            <div className="flex gap-4">
              {/* Votes */}
              <div className="flex flex-col items-center gap-1">
                <button className="p-1 text-muted-foreground hover:text-primary">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <span className="text-sm font-semibold text-foreground">{post.votes}</span>
                <button className="p-1 text-muted-foreground hover:text-primary">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${post.categoryColor}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Posted by {post.author} - {post.timeAgo}
                  </span>
                </div>

                <h3 className="font-semibold text-foreground mb-2">{post.title}</h3>
                
                {post.content && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                )}

                {post.hasMedia && (
                  <div className="mt-3 relative rounded-xl overflow-hidden bg-[var(--surface-section)] aspect-video">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-14 w-14 rounded-full bg-primary/90 flex items-center justify-center">
                        <Play className="h-6 w-6 text-primary-foreground ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/60 rounded px-2 py-1 text-xs text-white">
                      10:24
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 mt-4">
                  <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                    <MessageSquare className="h-4 w-4" />
                    {post.replies} replies
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                    <Bookmark className="h-4 w-4" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
