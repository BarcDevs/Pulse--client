'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Search } from 'lucide-react'

import { Input } from '@/components/shared/inputs/Input'

import { supportLocales } from '@/locales/supportLocales'

export const SupportSearch = () => {
    const t = useTranslations()
    const [query, setQuery] = useState('')

    return (
        <div className={'relative mb-7'}>
            <Search className={'absolute start-4 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground'}/>
            <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t(supportLocales.search.placeholder)}
                variant={'search'}
                className={'ps-11'}
            />
        </div>
    )
}
