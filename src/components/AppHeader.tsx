'use client'

import { ChangeEvent, useState } from 'react'

import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Search } from 'lucide-react'

import { useQueryClient } from '@tanstack/react-query'

import type { Post } from '@/types/community'

import { GoalDetailBreadcrumb }
    from '@/components/goals/GoalDetailBreadcrumb'
import { HeaderActionButton }
    from '@/components/layout/header/HeaderActionButton'
import { HeaderBadge } from '@/components/layout/header/HeaderBadge'
import { HeaderNotificationButton }
    from '@/components/layout/header/HeaderNotificationButton'
import { HeaderTitle } from '@/components/layout/header/HeaderTitle'
import { UserMenu } from '@/components/layout/header/UserMenu'
import { FormInput } from '@/components/shared/inputs/FormInput'
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'

import { getHeaderConfig } from '@/constants/config/getHeaderConfig'
import { forumQueryKeys } from '@/constants/queryKeys'

import { FEATURES } from '@/config/features'

import { useAuth } from '@/context/AuthContext'

import { dashboardLocales } from '@/locales/dashboardLocales'
import { globalLocales } from '@/locales/globalLocales'

// todo: make AppHeader follow OCP rule
export const AppHeader = () => {
    const t = useTranslations()
    const [searchValue, setSearchValue] = useState('')
    const pathname = usePathname()
    const { user } = useAuth()
    const queryClient = useQueryClient()

    const segments = pathname.split('/').filter(Boolean)
    const isGoalDetail =
        segments[0] === 'recovery-goals'
        && segments.length === 2
    const goalId = isGoalDetail ? segments[1] : ''
    const isPostDetail =
        segments[0] === 'community'
        && segments[1] === 'post'
        && segments.length === 3

    const {
        title: titleKey,
        subtitle: subtitleKey,
        showSearch,
        actions,
        badge
    } = getHeaderConfig(pathname.slice(1))

    const title = t(titleKey)

    const postTitle = isPostDetail
        ? queryClient.getQueryData<Post>(forumQueryKeys.post(segments[2]))?.title
        : undefined

    const subtitle = postTitle
        ?? (pathname === '/dashboard' && user
            ? t(dashboardLocales.greeting, { name: user.firstName })
            : subtitleKey ? t(subtitleKey) : undefined)

    const handleSearchChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => setSearchValue(e.target.value)

    return (
        <header className={'sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-surface-card px-4 md:px-6'}>
            {isGoalDetail
                ? <GoalDetailBreadcrumb goalId={goalId}/>
                : <HeaderTitle
                    title={title}
                    subtitle={subtitle}
                />
            }

            <div className={'flex items-center gap-3'}>
                {badge && (
                    <HeaderBadge
                        label={badge.label}
                        variant={badge.variant}
                        icon={badge.icon}
                    />
                )}

                {showSearch && (
                    <div className={'relative'}>
                        <Search className={'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'}/>
                        <FormInput
                            id={'headerSearch'}
                            placeholder={t(globalLocales.layout.header.searchPlaceholder)}
                            value={searchValue}
                            onChange={handleSearchChange}
                            type={'text'}
                            className={'h-10 w-64 rounded-lg bg-surface-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20'}
                            required={false}
                        />
                    </div>
                )}

                {actions?.map((action) => (
                    <HeaderActionButton
                        key={action.type}
                        action={action}
                    />
                ))}

                {FEATURES.notifications && (
                    <HeaderNotificationButton/>
                )}
                <div className={'flex items-center'}>
                    <LanguageSwitcher/>
                    <UserMenu/>
                </div>
            </div>
        </header>
    )
}
