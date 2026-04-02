'use client'

import {useState} from 'react'

import {Trophy} from 'lucide-react'

import type {FormControlProps} from '@/types/forms'

import {FormInput} from '@/components/shared/inputs/FormInput'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import {checkInTexts} from '@/constants/componentTexts/checkIn'

import type {CheckInSchema} from '@/validations/forms/checkInSchema'

import {ActivityToggleButton} from './ActivityToggleButton'

type CheckInActivitiesProps = FormControlProps<CheckInSchema> & {
    suggestedActivities?: string[]
}

export const CheckInActivities = ({
    watch,
    setValueAction,
    suggestedActivities = []
}: CheckInActivitiesProps) => {
    const [customActivity, setCustomActivity] = useState('')
    const selectedActivities = watch('activities') ?? []

    const handleActivitiesChange = (updated: string[]) => {
        setValueAction('activities', updated)
    }

    const customActivities = selectedActivities.filter(
        (activity) => !checkInTexts.activities.default.includes(
            activity
        )
    )

    const toggleActivity = (activity: string) => {
        const updated = selectedActivities
            .includes(activity) ?
            selectedActivities.filter((a) =>
                a !== activity
            ) : [
                ...selectedActivities,
                activity
            ]
        handleActivitiesChange(updated)
    }

    const addCustomActivity = () => {
        const trimmed = customActivity.trim()

        if (trimmed &&
            !selectedActivities.includes(trimmed)) {
            const updated = [
                ...selectedActivities,
                trimmed
            ]
            handleActivitiesChange(updated)
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
            <CardContent className={'space-y-4'}>
                {suggestedActivities.length > 0 && (
                    <div>
                        <p className={'mb-2 text-xs text-muted-foreground'}>
                            Your top activities:
                        </p>
                        <div className={'flex flex-wrap gap-2'}>
                            {suggestedActivities.map(
                                (activity) => (
                                    <ActivityToggleButton
                                        key={activity}
                                        activity={activity}
                                        isSelected={selectedActivities.includes(activity)}
                                        onToggle={toggleActivity}
                                    />
                                ))}
                        </div>
                    </div>
                )}

                <div>
                    <p className={'mb-2 text-xs text-muted-foreground'}>
                        All activities:
                    </p>
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

                        {customActivities.map((activity) => (
                            <ActivityToggleButton
                                key={activity}
                                activity={activity}
                                isSelected={true}
                                onToggle={toggleActivity}
                            />
                        ))}

                        <div className={'flex items-center gap-2'}>
                            <FormInput
                                id={'customActivity'}
                                placeholder={checkInTexts.activities.placeholder}
                                value={customActivity}
                                onChange={(e) => setCustomActivity(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        addCustomActivity()
                                    }
                                }}
                                className={'h-9 w-32 rounded-full border-border bg-surface-card'}
                                required={false}
                                type={'text'}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
