'use client'

import { useState } from 'react'

import { Trophy } from 'lucide-react'

import { FormInput } from '@/components/shared/FormInput'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { cn } from '@/lib/utils'

import {
    CHECKIN_ACTIVITIES_DEFAULT,
    CHECKIN_ACTIVITIES_PLACEHOLDER,
    CHECKIN_ACTIVITIES_TITLE,
} from '@/constants/checkInTexts'

type CheckInActivitiesProps = {
  selectedActivities: string[]
  setSelectedActivities: (activities: string[]) => void
}

const CheckInActivities = ({
  selectedActivities,
  setSelectedActivities,
}: CheckInActivitiesProps) => {
  const [customActivity, setCustomActivity] = useState('')

  const toggleActivity = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter((a) => a !== activity))
    } else {
      setSelectedActivities([...selectedActivities, activity])
    }
  }

  const addCustomActivity = () => {
    if (customActivity.trim() && !selectedActivities.includes(customActivity.trim())) {
      setSelectedActivities([...selectedActivities, customActivity.trim()])
      setCustomActivity('')
    }
  }

  return (
    <Card className={'mt-6 border-0 shadow-sm'}>
      <CardHeader className={'pb-3'}>
        <div className={'flex items-center gap-2'}>
          <Trophy className={'size-5 text-warning'} />
          <CardTitle className={'text-lg font-semibold'}>
            {CHECKIN_ACTIVITIES_TITLE}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className={'flex flex-wrap gap-2'}>
          {CHECKIN_ACTIVITIES_DEFAULT.map((activity) => (
            <button
              key={activity}
              onClick={() => toggleActivity(activity)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                selectedActivities.includes(activity)
                  ? 'bg-primary text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              )}
            >
              {selectedActivities.includes(activity) && (
                <span className={'mr-1'}>+</span>
              )}
              {activity}
            </button>
          ))}
          <div className={'flex items-center gap-2'}>
            <FormInput
              id={'customActivity'}
              placeholder={CHECKIN_ACTIVITIES_PLACEHOLDER}
              value={customActivity}
              onChange={(e) => setCustomActivity(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCustomActivity()}
              className={'h-9 w-32 rounded-full border-border bg-surface-card'}
              required={false}
              type={'text'}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { CheckInActivities }
