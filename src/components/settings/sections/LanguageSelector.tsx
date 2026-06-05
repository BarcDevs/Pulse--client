'use client'

import { useTranslations } from 'next-intl'

import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { useLanguageSwitcher } from '@/hooks/ui/useLanguageSwitcher'

import { settingsLocales } from '@/locales/settingsLocales'

export const LanguageSelector = () => {
    const t = useTranslations()
    const {
        locale,
        currentLanguage,
        languageList,
        changeLanguage
    } = useLanguageSwitcher()

    return (
        <div className={'flex items-center justify-between'}>
            <div>
                <h4 className={'font-medium text-foreground'}>
                    {t(settingsLocales.preferences.language.title)}
                </h4>
                <p className={'text-sm text-muted-foreground'}>
                    {t(settingsLocales.preferences.language.description)}
                </p>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={'outline'}
                        className={'gap-2'}
                    >
                        {currentLanguage?.nativeName ?? locale}
                        <ChevronDown className={'h-4 w-4 opacity-50'}/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={'end'}>
                    {languageList.map((lang) => (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                        >
                            {lang.nativeName}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
