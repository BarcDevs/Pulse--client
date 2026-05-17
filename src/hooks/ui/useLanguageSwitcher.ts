'use client'

import { useTransition } from 'react'

import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

import { useUpdateProfileMutation }
    from '@/hooks/profile/useProfileMutations'
import { useGetMe } from '@/hooks/queries/useGetMe'

import { switchLocale } from '@/lib/language/switchLocale'

import languages from '@/data/languages'

export const useLanguageSwitcher = () => {
    const router = useRouter()
    const locale = useLocale()
    const [isPending, startTransition] = useTransition()
    const { user } = useGetMe()
    const { mutate: updateProfile } = useUpdateProfileMutation()

    const currentLanguage = Object.values(languages).find(
        (lang) => lang.code === locale
    ) ?? null

    const changeLanguage = (code: string) => {
        if (user)
            updateProfile({ language: code })

        startTransition(async () => {
            await switchLocale(code)
            router.refresh()
        })
    }

    return {
        locale,
        currentLanguage,
        languageList: Object.values(languages),
        changeLanguage,
        isPending
    }
}
