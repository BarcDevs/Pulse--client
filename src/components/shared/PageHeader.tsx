'use client'

import { useRouter } from 'next/navigation'

import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'

type PageHeaderProps = {
    title: string
    subtitle?: string
    backHref: string
    backLabel?: string
}

export const PageHeader = ({
    title,
    subtitle,
    backHref,
    backLabel = 'Back'
}: PageHeaderProps) => {
    const router = useRouter()

    return (
        <>
            <Button
                onClick={() => router.push(backHref)}
                size={'sm'}
                variant={'ghost'}
                className={'mb-8 gap-2 text-primary hover:bg-primary hover:text-white'}
            >
                <ArrowLeft size={16}/>
                {backLabel}
            </Button>

            <header className={'mb-12'}>
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
