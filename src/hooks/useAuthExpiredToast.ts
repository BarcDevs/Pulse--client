'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { toast } from 'sonner'

import config from '@/config'

import { communityLocales } from '@/locales/communityLocales'

export const useAuthExpiredToast = () => {
    const router = useRouter()
    const pathname = usePathname()
    const t = useTranslations()

    const loginUrl = `/login?redirect=${encodeURIComponent(pathname)}`
    const loginLabel = t(communityLocales.toasts.loginButton)

    const showSessionExpired = () => {
        toast.error(t(communityLocales.toasts.sessionExpired), {
            action: {
                label: loginLabel,
                onClick: () => router.push(loginUrl)
            }
        })
    }

    const showWorkSaved = () => {
        toast.info(
            t(communityLocales.toasts.workSaved, {
                minutes: config.communityDraftTtlMinutes
            })
        )
    }

    return { showSessionExpired, showWorkSaved }
}
