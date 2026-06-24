import type { CheckInStats } from '@/types/checkIn'
import type { TranslatorFn } from '@/types/i18n'

import { progressLocales } from '@/locales/progressLocales'
import { PostFormSchema } from '@/validations/forms/postFormSchema'

export const buildShareProgressDraft = (
    t: TranslatorFn,
    stats: CheckInStats,
    milestonesCompleted: number | undefined
): PostFormSchema => ({
    title: t(progressLocales.share.communityPostTitle),
    category: 'sharedProgress',
    body: `
        <p>${t(progressLocales.share.communityIntro)}</p>
        <ul>
            <li><strong>${t(progressLocales.share.currentStreakLabel)}:</strong> ${stats.currentStreak}</li>
            <li><strong>${t(progressLocales.share.averageMoodLabel)}:</strong> ${stats.averageMoodScore.toFixed(1)}</li>
            <li><strong>${t(progressLocales.share.milestonesLabel)}:</strong> ${milestonesCompleted ?? 0}</li>
        </ul>
        <p><em>${t(progressLocales.share.communityFooter)}</em></p>
    `.trim(),
    tags: ['progress']
})
