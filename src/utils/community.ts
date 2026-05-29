import type { Locale } from 'date-fns'

import type { CommunityActivityItem } from '@/types/community'
import { TranslatorFn } from '@/types/i18n'

import { toRelative } from '@/lib/time'
import { getUserFallback } from '@/lib/utils'

type ActivityDisplayItem = {
    id: string
    avatar: string
    user: string
    action: string
    time: string
}

export const mapActivityItems = (
    items: CommunityActivityItem[],
    t: TranslatorFn,
    dateLocale: Locale,
    limit: number
): ActivityDisplayItem[] =>
    items.slice(0, limit).map((item) => {
        const hasName = item.firstName || item.lastName
        const avatar = hasName
            ? getUserFallback(item.firstName, item.lastName)
            : item.username[0]?.toUpperCase() || '?'

        const params = item.actionParams?.category
            ? {
                ...item.actionParams,
                category: t(
                    `community.categories.names.${item.actionParams.category}`
                )
            }
            : item.actionParams

        return {
            id: item.id,
            avatar,
            user: item.firstName || item.username,
            action: t(item.actionKey, params),
            time: toRelative(new Date(item.timestamp), dateLocale)
        }
    })
