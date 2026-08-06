'use client'

import { useRouter } from 'next/navigation'

import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'

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
    tabs?: PageHeaderTab[]
}

export const PageHeader = ({
    title,
    subtitle,
    backLabel = 'Back',
    kicker,
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
            <Button
                onClick={handleBack}
                size={'sm'}
                variant={'ghost'}
                className={'mb-8 gap-2 text-primary hover:bg-primary hover:text-white'}
            >
                <ArrowLeft size={16}/>
                {backLabel}
            </Button>

            <header className={'mb-12'}>
                <div className={'mb-4 flex flex-wrap items-center justify-between gap-4'}>
                    {kicker && (
                        <p className={'text-sm font-semibold uppercase tracking-wide text-primary'}>
                            {kicker}
                        </p>
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
