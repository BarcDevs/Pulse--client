'use client'

import { Activity,Apple, Star, Users } from 'lucide-react'

const categories = [
  {
    id: 1,
    icon: Users,
    title: 'Support Groups',
    description: 'Find specialized peer-led sessions',
    count: '10 Active Groups',
    color: 'bg-blue-50 text-primary',
  },
  {
    id: 2,
    icon: Star,
    title: 'Success Stories',
    description: 'Inspiration from milestones reached',
    count: '452 Stories',
    color: 'bg-purple-50 text-accent',
  },
  {
    id: 3,
    icon: Apple,
    title: 'Nutrition',
    description: 'Fueling your body for recovery',
    count: 'New Recipes',
    color: 'bg-orange-50 text-warning',
  },
  {
    id: 4,
    icon: Activity,
    title: 'Yoga & Movement',
    description: 'Healing through somatic practice',
    count: 'Live Today',
    color: 'bg-emerald-50 text-secondary',
  },
]

export function Categories() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Browse Categories</h2>
        <button className="text-sm text-primary hover:underline">View All</button>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="rounded-2xl bg-[var(--surface-card)] p-5 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${category.color}`}>
              <category.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-3 font-medium text-foreground">{category.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
            <p className="mt-2 text-xs text-primary font-medium">{category.count}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
