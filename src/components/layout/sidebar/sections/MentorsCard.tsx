'use client'

import { useTranslations } from 'next-intl'

import { COMMUNITY_MENTORS } from '@/mocks/communityData'

import { MentorItem } from './MentorItem'

export const MentorsCard = () => {
    const t = useTranslations()

    return (
        <div className={'rounded-2xl bg-surface-card p-5'}>
            <h3 className={'mb-4 font-semibold text-foreground'}>
                {t('community.mentors.title')}
            </h3>

            <div className={'space-y-3'}>
                {COMMUNITY_MENTORS.map((mentor) => (
                    <MentorItem
                        key={mentor.id}
                        id={String(mentor.id)}
                        avatar={mentor.avatar}
                        name={mentor.name}
                        role={mentor.role}
                        online={mentor.online}
                    />
                ))}
            </div>
        </div>
    )
}