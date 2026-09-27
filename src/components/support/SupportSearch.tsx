'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { SearchInput } from '@/components/shared/inputs/SearchInput'

import { supportLocales } from '@/locales/supportLocales'

export const SupportSearch = () => {
    const t = useTranslations()
    const [query, setQuery] = useState('')

    return (
        <SearchInput
            variant={'pill'}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t(supportLocales.search.placeholder)}
            className={'mb-7'}
        />
    )
}
