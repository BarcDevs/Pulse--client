import { useTranslations } from 'next-intl'

import { Target } from 'lucide-react'

import { progressLocales } from '@/locales/progressLocales'

type MilestonesHeaderProps = {
    completed: number
    total: number
}

export const MilestonesHeader = ({
    completed,
    total
}: MilestonesHeaderProps) => {
    const t = useTranslations()

    return (
        <div className={'flex-start-between mb-3'}>
            <div>
                <p className={'text-muted-foreground label-uppercase'}>
                    {t(progressLocales.stats.milestones.label)}
                </p>
                <div className={'mt-2 flex items-baseline gap-2'}>
                    <span className={'text-4xl font-bold text-foreground'}>
                        {completed}
                    </span>
                    <span className={'text-lg text-muted-foreground'}>
                        {t(
                            progressLocales.stats.milestones.outOf, {
                                total
                            })}
                    </span>
                </div>
            </div>
            <div className={'h-12 w-12 rounded-xl flex--center bg-milestone-icon-bg'}>
                <Target className={'h-6 w-6 text-insight'}/>
            </div>
        </div>
    )
}
