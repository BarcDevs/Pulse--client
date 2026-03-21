import { Brain, Heart, Lock, Rocket } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {
    PROGRESS_MILESTONES,
    PROGRESS_MILESTONES_SEE_ALL,
    PROGRESS_MILESTONES_TITLE,
} from '@/constants/progressTexts'

const iconMap = {
    'First Step': Rocket,
    '7-Day Streak': Heart,
    'Mind Master': Brain,
    '1 Month Active': Lock,
}

const styleMap = {
    'First Step': {
        iconBg: 'bg-primary-light',
        iconColor: 'text-primary',
    },
    '7-Day Streak': {
        iconBg: 'bg-red-50',
        iconColor: 'text-red-500',
    },
    'Mind Master': {
        iconBg: 'bg-accent-light',
        iconColor: 'text-accent',
    },
    '1 Month Active': {
        iconBg: 'bg-gray-100',
        iconColor: 'text-gray-400',
    },
}

const milestones = PROGRESS_MILESTONES.map((milestone) => ({
    ...milestone,
    icon: iconMap[milestone.title as keyof typeof iconMap],
    ...styleMap[milestone.title as keyof typeof styleMap],
}))

export const ProgressMilestones = () => (
  <Card className={'mt-6 border-0 shadow-sm'}>
    <CardHeader className={'flex flex-row items-center justify-between'}>
      <CardTitle className={'text-lg font-semibold'}>{PROGRESS_MILESTONES_TITLE}</CardTitle>
      <span className={'text-sm text-muted-foreground'}>{PROGRESS_MILESTONES_SEE_ALL}</span>
    </CardHeader>
    <CardContent>
      <div className={'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
        {milestones.map((milestone) => (
          <div
            key={milestone.title}
            className={`flex flex-col items-center rounded-xl p-6 text-center ${
              milestone.achieved ? 'bg-surface-section' : 'bg-muted opacity-60'
            }`}
          >
            <div
              className={`flex size-12 items-center justify-center rounded-xl ${milestone.iconBg}`}
            >
              <milestone.icon className={`size-6 ${milestone.iconColor}`} />
            </div>
            <h4 className={'mt-3 font-semibold text-foreground'}>
              {milestone.title}
            </h4>
            <p className={'mt-1 text-sm text-muted-foreground'}>
              {milestone.description}
            </p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)
