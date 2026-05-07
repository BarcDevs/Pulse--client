'use client'

import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

import { Check, Globe } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { switchLocale } from '@/lib/language/switchLocale'
import { cn } from '@/lib/utils'

import languages from '@/data/languages'

export const LanguageSwitcher = () => {
    const locale = useLocale()
    const router = useRouter()

    const languageList = Object.values(languages)
    const currentLang = languageList.find(
        (lang) => lang.code === locale
    )

    const handleLanguageChange = async (
        newLocale: string
    ) => {
        await switchLocale(newLocale)
        router.refresh()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={'outline'}
                    size={'sm'}
                    className={'gap-2 border-1 data-[state=open]:border-primary no-focus'}
                >
                    <Globe className={'h-4 w-4'}/>
                    <span>{currentLang?.shortCode}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align={'end'}
                className={'bg-surface-page'}
            >
                {languageList.map((lang) => {
                    const isActive = locale === lang.code
                    return (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={cn(
                                'cursor-pointer flex items-center gap-3 px-3 py-2 rounded-sm',
                                isActive
                                    ? 'bg-primary-light text-primary'
                                    : 'bg-surface-page text-foreground hover:bg-muted'
                            )}
                        >
                            <span
                                className={cn(
                                    isActive
                                        ? 'text-primary'
                                        : 'text-muted-foreground'
                                )}
                            >
                                {lang.shortCode}
                            </span>
                            <span>{lang.nativeName}</span>
                            {isActive && (
                                <Check className={'ml-auto h-4 w-4 text-primary'}/>
                            )}
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
