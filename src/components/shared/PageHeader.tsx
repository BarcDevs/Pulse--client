'use client'

import { useRouter } from 'next/navigation'

import { ArrowLeft } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Badge } from '@/components/shared/badges/Badge'
import { TextButton } from '@/components/shared/buttons/TextButton'

import { ROUTES } from '@/constants/routes'

import { useAuth } from '@/context/AuthContext'

import { PageHeaderTabs } from './PageHeaderTabs'

type PageHeaderTab = {
    label: string
    href: string
}

type PageHeaderProps = {
    title: string
    subtitle?: string
    backLabel?: string
    kicker?: string
    kickerIcon?: LucideIcon
    tabs?: PageHeaderTab[]
}

export const PageHeader = ({
    title,
    subtitle,
    backLabel = 'Back',
    kicker,
    kickerIcon: KickerIcon,
    tabs
}: PageHeaderProps) => {
    const router = useRouter()
    const { user } = useAuth()

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back()
            return
        }

        router.push(user ? ROUTES.DASHBOARD : ROUTES.HOME)
    }

    return (
        <>
            <TextButton
                onClick={handleBack}
                className={'mb-8 gap-2 print:hidden'}
            >
                <ArrowLeft size={16}/>
                {backLabel}
            </TextButton>

            <header className={'mb-12'}>
                <div className={'mb-4 flex flex-wrap items-center justify-between gap-4'}>
                    {kicker && (
                        <Badge className={'gap-1.5'}>
                            {KickerIcon && <KickerIcon className={'size-3'}/>}
                            {kicker}
                        </Badge>
                    )}
                    {tabs && <PageHeaderTabs tabs={tabs}/>}
                </div>
                <h1 className={'text-4xl md:text-5xl font-extrabold text-on-surface tracking-tighter mb-4'}>
                    {title}
                </h1>
                {subtitle && (
                    <p className={'text-on-surface-variant text-lg max-w-2xl leading-relaxed'}>
                        {subtitle}
                    </p>
                )}
            </header>
        </>
    )
}
