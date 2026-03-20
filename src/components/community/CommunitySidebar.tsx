'use client'

import { Hash,Lock, MessageCircle, Shield, UserX } from 'lucide-react'

import { Button } from '@/components/ui/Button'

const mentors = [
  { id: 1, name: 'David Chen', role: 'Certified Coach', avatar: 'D', online: true },
  { id: 2, name: 'Maria G.', role: 'Wellness Guide', avatar: 'M', online: false },
]

const trendingTopics = [
  '#DailyGratitude',
  '#SobrietyTips',
  '#HealthyHabits',
  '#SelfCare',
  '#SleepHygiene',
]

export function CommunitySidebar() {
  return (
    <div className="space-y-6">
      {/* Recovery Mentors */}
      <div className="rounded-2xl bg-[var(--surface-card)] p-5">
        <h3 className="font-semibold text-foreground mb-4">Recovery Mentors</h3>
        <div className="space-y-3">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {mentor.avatar}
                  </div>
                  {mentor.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[var(--surface-card)] bg-success" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{mentor.name}</p>
                  <p className="text-xs text-muted-foreground">{mentor.role}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="text-xs">
                Chat
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Community Sanctuary */}
      <div className="rounded-2xl bg-primary/5 border border-primary/20 p-5">
        <h3 className="font-semibold text-foreground mb-2">Community Sanctuary</h3>
        <p className="text-sm text-muted-foreground mb-4">
          HealEase is a safe, non-judgmental space. We prioritize empathy, privacy, and supportive dialogue.
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-secondary" />
            Be kind and be open
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4 text-secondary" />
            No unsolicited medical advice
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <UserX className="h-4 w-4 text-secondary" />
            Protect user anonymity
          </div>
        </div>
        
        <Button variant="outline" size="sm" className="mt-4 w-full">
          Read Guidelines
        </Button>
      </div>

      {/* Trending Topics */}
      <div className="rounded-2xl bg-[var(--surface-card)] p-5">
        <h3 className="font-semibold text-foreground mb-4">Trending Topics</h3>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic) => (
            <button
              key={topic}
              className="px-3 py-1.5 rounded-full bg-[var(--surface-section)] text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
