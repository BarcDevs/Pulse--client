import type { Locale } from 'date-fns'

import type {
    CommunityActivityItem,
    Reply
} from '@/types/community'
import { TranslatorFn } from '@/types/i18n'
import type { PartialUser } from '@/types/user'

import { toRelative } from '@/lib/time'
import { getUserFallback } from '@/lib/utils'

import { defaults } from '@/constants/defaults'

type ActivityDisplayItem = {
    id: string
    avatar: string
    user: string
    action: string
    time: string
}

export const getAuthorDisplayName = (
    author: PartialUser | undefined,
    fallback = 'Unknown'
): string => {
    if (!author) return fallback
    const { firstName, lastName, username } = author.user
    return firstName && lastName
        ? `${firstName} ${lastName}`
        : username
}

type ReplyAuthorView = {
    name: string
    initials: string | undefined
    imageSrc: string | undefined
    isDeleted: boolean
}

/** How to show a reply's author. A reply whose author's account was purged has
 * no author id: show the localized label and a neutral avatar, never the
 * server's placeholder username */
export const getReplyAuthorView = (
    reply: Pick<Reply, 'authorId' | 'author'>,
    deletedLabel: string
): ReplyAuthorView => {
    if (reply.authorId === null) {
        return {
            name: deletedLabel,
            initials: defaults.community.deletedAuthorInitials,
            imageSrc: undefined,
            isDeleted: true
        }
    }

    const authorUser = reply.author?.user

    return {
        name: getAuthorDisplayName(reply.author),
        initials: authorUser && getUserFallback(
            authorUser.firstName,
            authorUser.lastName
        ),
        imageSrc: reply.author?.image ?? undefined,
        isDeleted: false
    }
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
