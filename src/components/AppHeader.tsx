'use client'

import { ChangeEvent, useState } from 'react'

import { usePathname } from 'next/navigation'

import { Search } from 'lucide-react'

import { HeaderActionButton }
    from '@/components/layout/header/HeaderActionButton'
import { HeaderBadge } from '@/components/layout/header/HeaderBadge'
import { HeaderNotificationButton }
    from '@/components/layout/header/HeaderNotificationButton'
import { HeaderTitle } from '@/components/layout/header/HeaderTitle'
import { UserMenu } from '@/components/layout/header/UserMenu'
import { FormInput } from '@/components/shared/inputs/FormInput'

import { dashboardPageTexts } from '@/constants/componentTexts/dashboard'
import { appLayoutTexts } from '@/constants/componentTexts/ui/layout'
import { getHeaderConfig } from '@/constants/config/getHeaderConfig'

import { useAuth } from '@/context/AuthContext'


export const AppHeader = () => {
    const [searchValue, setSearchValue] = useState('')
    const pathname = usePathname()
    const { user } = useAuth()
    const {
        title,
        subtitle,
        showSearch,
        actions,
        badge
    } = getHeaderConfig(pathname.slice(1))

    const welcomeSubtitle =
        pathname === '/dashboard' && user
            ? `${dashboardPageTexts.greeting} ${user.firstName}`
            : subtitle

    const headerClassName = 'sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-surface-card px-4 md:px-6'
    const formInputClassName = 'h-10 w-64 rounded-lg bg-surface-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20'

    const handleSearchChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => setSearchValue(e.target.value)

    return (
        <header className={headerClassName}>
            <HeaderTitle
                title={title}
                subtitle={welcomeSubtitle}
            />

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
                            placeholder={appLayoutTexts.header.searchPlaceholder}
                            value={searchValue}
                            onChange={handleSearchChange}
                            type={'text'}
                            className={formInputClassName}
                            required={false}
                        />
                    </div>
                )}

                {actions?.map((action, idx) => (
                    <HeaderActionButton
                        key={`${action.type}-${idx}`}
                        action={action}
                    />
                ))}

                <HeaderNotificationButton/>
                <UserMenu/>
            </div>
        </header>
    )
}