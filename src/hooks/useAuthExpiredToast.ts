'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { toast } from 'sonner'

import { ROUTES } from '@/constants/routes'
import { secondInMs } from '@/constants/time'

import config from '@/config'

import { communityLocales } from '@/locales/communityLocales'

export const useAuthExpiredToast = () => {
    const router = useRouter()
    const pathname = usePathname()
    const t = useTranslations()

    const loginUrl = ROUTES.loginWithRedirect(pathname)
    const loginLabel = t(communityLocales.toasts.loginButton)

    const showSessionExpired = () => {
        toast.error(t(communityLocales.toasts.sessionExpired), {
            duration: 8 * secondInMs,
            action: {
                label: loginLabel,
                onClick: () => router.push(loginUrl)
            }
        })
    }

    const showAuthExpiredWithDraft = () => {
        toast.error(t(communityLocales.toasts.sessionExpired), {
            duration: 8 * secondInMs,
            description: t(communityLocales.toasts.workSaved, {
                minutes: config.communityDraftTtlMinutes
            }),
            action: {
                label: loginLabel,
                onClick: () => router.push(loginUrl)
            }
        })
    }

    return {
        showSessionExpired,
        showAuthExpiredWithDraft
    }
}
