'use client'

import { Activity, Apple, Star, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import {
    COMMUNITY_BROWSE_CATEGORIES,
    COMMUNITY_CATEGORIES,
    COMMUNITY_VIEW_ALL,
} from '@/constants/communityTexts'

//todo constant
const iconMap = {
    'Support Groups': Users,
    'Success Stories': Star,
    'Nutrition': Apple,
    'Yoga & Movement': Activity,
}

const colorMap = {
    'Support Groups': 'bg-blue-50 text-primary',
    'Success Stories': 'bg-purple-50 text-accent',
    'Nutrition': 'bg-orange-50 text-warning',
    'Yoga & Movement': 'bg-emerald-50 text-secondary',
}

const categories = COMMUNITY_CATEGORIES.map((cat) => ({
    ...cat,
    icon: iconMap[cat.title as keyof typeof iconMap],
    color: colorMap[cat.title as keyof typeof colorMap],
}))

export const Categories = () => (
  <div>
    <div className={'flex items-center justify-between mb-4'}>
      <h2 className={'text-lg font-semibold text-foreground'}>{COMMUNITY_BROWSE_CATEGORIES}</h2>
      <Button
        variant={'link'}
        className={'h-auto p-0 text-sm text-primary hover:underline'}
      >
        {COMMUNITY_VIEW_ALL}
      </Button>
    </div>

    <div className={'grid grid-cols-2 lg:grid-cols-4 gap-4'}>
      {categories.map((category) => (
        <div
          key={category.id}
          className={'rounded-2xl bg-surface-card p-5 hover:shadow-md transition-shadow cursor-pointer'}
        >
          <div className={cn('inline-flex h-12 w-12 items-center justify-center rounded-xl', category.color)}>
            <category.icon className={'h-6 w-6'} />
          </div>
          <h3 className={'mt-3 font-medium text-foreground'}>{category.title}</h3>
          <p className={'mt-1 text-sm text-muted-foreground'}>{category.description}</p>
          <p className={'mt-2 text-xs text-primary font-medium'}>{category.count}</p>
        </div>
      ))}
    </div>
  </div>
)
