'use client'

import { useLocale } from 'next-intl'

import type { Locale } from 'date-fns'
import { enUS, he } from 'date-fns/locale'

import languages from '@/data/languages'

const DATE_LOCALES: Record<string, Locale> = {
    [languages.en.code]: enUS,
    [languages.he.code]: he
}

export const useDateLocale = (): Locale => {
    const locale = useLocale()
    return DATE_LOCALES[locale] ?? enUS
}
