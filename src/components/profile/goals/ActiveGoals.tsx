import { useTranslations } from 'next-intl'

import { GoalProgressBar } from '@/components/shared/bars/GoalProgressBar'
import { Button } from '@/components/ui/button'

import { profileLocales } from '@/locales/profileLocales'

// TODO: Add user's active goals with progress tracking to Profile type
export const ActiveGoals = () => {
    const t = useTranslations()

    return (
        <div className={'rounded-2xl bg-primary p-6 text-primary-foreground'}>
            <h3 className={'text-lg font-semibold mb-6'}>
                {t(profileLocales.goals.title)}
            </h3>

            <div className={'space-y-4'}>
                {/* TODO: Replace mock list with real goals from API */}
                {[
                    { label: 'PHYSIO THERAPY', progress: 80 },
                    { label: 'DAILY MEDITATION', progress: 65 },
                    { label: 'SLEEP HYGIENE', progress: 40 }
                ].map((goal) => (
                    <GoalProgressBar
                        key={goal.label}
                        label={goal.label}
                        progress={goal.progress}
                        variant={'white'}
                    />
                ))}
            </div>

            <Button
                variant={'secondary'}
                className={'w-full mt-6 bg-white/20 hover:bg-white/30 text-primary-foreground border-0'}
            >
                {t(profileLocales.goals.viewRoadmap)}
            </Button>
        </div>
    )
}
