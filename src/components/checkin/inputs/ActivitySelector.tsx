'use client'

import {useState} from 'react'

import {Trophy} from 'lucide-react'

import {FormInput} from '@/components/shared/inputs/FormInput'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import {checkInTexts} from '@/constants/componentTexts/checkIn'

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
                        {checkInTexts.activities.title}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className={'flex flex-wrap gap-2'}>
                    {checkInTexts.activities.default.map(
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
                            placeholder={checkInTexts.activities.placeholder}
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
