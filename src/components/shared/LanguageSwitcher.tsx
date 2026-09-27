'use client'

import { Check, Globe } from 'lucide-react'

import { MenuTriggerButton } from '@/components/shared/buttons/MenuTriggerButton'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { useLanguageSwitcher } from '@/hooks/ui/useLanguageSwitcher'

import { cn } from '@/lib/utils'

export const LanguageSwitcher = () => {
    const languageSwitcher = useLanguageSwitcher()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MenuTriggerButton>
                    <Globe className={'h-4 w-4'}/>
                    <span>{languageSwitcher.language.currentLanguage?.shortCode}</span>
                </MenuTriggerButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align={'end'}
                className={'bg-surface-page'}
            >
                {languageSwitcher.language.languageList.map((lang) => {
                    const isActive = languageSwitcher.language.locale === lang.code

                    return (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => languageSwitcher.switching.changeLanguage(lang.code)}
                            className={cn(
                                'cursor-pointer flex items-center gap-3 px-3 py-2 rounded-sm',
                                isActive
                                    ? 'bg-primary-light text-primary'
                                    : 'bg-surface-page text-foreground hover:bg-muted'
                            )}
                        >
                            <span className={cn(isActive ? 'text-primary' : 'text-muted-foreground')}>
                                {lang.shortCode}
                            </span>
                            <span>
                                {lang.nativeName}
                            </span>
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
