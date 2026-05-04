'use client'

import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

import { Globe } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { switchLocale } from '@/lib/language/switchLocale'

export const LanguageSwitcher = () => {
    const locale = useLocale()
    const router = useRouter()

    const handleToggle = async () => {
        const newLocale = locale === 'he-IL' ? 'en-US' : 'he-IL'
        await switchLocale(newLocale)
        router.refresh()
    }

    return (
        <Button
            variant={'ghost'}
            size={'icon'}
            onClick={handleToggle}
            title={locale === 'he-IL' ? 'English' : 'עברית'}
        >
            <Globe className={'h-4 w-4'}/>
            <span className={'ml-1 text-xs font-medium'}>
                {locale === 'he-IL' ? 'EN' : 'HE'}
            </span>
        </Button>
    )
}
