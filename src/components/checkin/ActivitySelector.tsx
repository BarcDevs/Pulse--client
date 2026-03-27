'use client'

import {useState} from 'react'

import {Trophy} from 'lucide-react'

import {FormInput} from '@/components/shared/FormInput'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import {
    CHECKIN_ACTIVITIES_DEFAULT,
    CHECKIN_ACTIVITIES_PLACEHOLDER,
    CHECKIN_ACTIVITIES_TITLE
} from '@/constants/checkInTexts'

import {ActivityToggleButton} from './ActivityToggleButton'

// todo: fix ts warning
type CheckInActivitiesProps = {
    selectedActivities: string[]
    setSelectedActivities: (activities: string[]) => void
}

export const CheckInActivities = ({
    selectedActivities,
    setSelectedActivities
}: CheckInActivitiesProps) => {
    const [customActivity, setCustomActivity] = useState('')

    const toggleActivity = (activity: string) => {
        if (selectedActivities.includes(activity)) {
            setSelectedActivities(
                selectedActivities.filter((a) =>
                    a !== activity
                )
            )
        } else {
            setSelectedActivities([
                ...selectedActivities,
                activity
            ])
        }
    }

    const addCustomActivity = () => {
        if (customActivity.trim() &&
            !selectedActivities.includes(customActivity.trim())) {
            setSelectedActivities([
                ...selectedActivities,
                customActivity.trim()
            ])
            setCustomActivity('')
        }
    }

    return (
        <Card className={'mt-6 border-0 shadow-sm'}>
            <CardHeader className={'pb-3'}>
                <div className={'flex items-center gap-2'}>
                    <Trophy className={'size-5 text-warning'}/>
                    <CardTitle className={'text-lg font-semibold'}>
                        {CHECKIN_ACTIVITIES_TITLE}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className={'flex flex-wrap gap-2'}>
                    {CHECKIN_ACTIVITIES_DEFAULT.map(
                        (activity) => (
                            <ActivityToggleButton
                                key={activity}
                                activity={activity}
                                isSelected={selectedActivities.includes(activity)}
                                onToggle={toggleActivity}
                            />
                        ))}

                    <div className={'flex items-center gap-2'}>
                        <FormInput
                            id={'customActivity'}
                            placeholder={CHECKIN_ACTIVITIES_PLACEHOLDER}
                            value={customActivity}
                            onChange={(e) => setCustomActivity(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === 'Enter' &&
                                addCustomActivity()
                            }
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
