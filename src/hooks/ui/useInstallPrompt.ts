import {
    useEffect,
    useState,
    useSyncExternalStore
} from 'react'

import { BeforeInstallPromptEvent } from '@/types/pwa'

import { useIsMobile } from '@/hooks/ui/useMobile'

import {
    isIos,
    isStandalone
} from '@/lib/pwa'

import {
    isInstallPromptSnoozed,
    snoozeInstallPrompt
} from '@/utils/installPromptStorage'

type InstallMode = 'native' | 'ios'

const subscribeToNothing = () => () => {}
const getCanPrompt = () => !isStandalone() && !isInstallPromptSnoozed()
const getServerSnapshot = () => false

export const useInstallPrompt = () => {
    const isMobile = useIsMobile()
    const canPrompt = useSyncExternalStore(
        subscribeToNothing,
        getCanPrompt,
        getServerSnapshot
    )
    const isIosDevice = useSyncExternalStore(
        subscribeToNothing,
        isIos,
        getServerSnapshot
    )
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
    const [isDismissed, setIsDismissed] = useState(false)

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault()
            setDeferredPrompt(event as BeforeInstallPromptEvent)
        }

        const handleInstalled = () => setDeferredPrompt(null)

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        window.addEventListener('appinstalled', handleInstalled)

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
            window.removeEventListener('appinstalled', handleInstalled)
        }
    }, [])

    const getMode = (): InstallMode | null => {
        if (deferredPrompt) return 'native'
        if (isIosDevice) return 'ios'

        return null
    }

    const mode = getMode()
    const isOpen = isMobile && canPrompt && !isDismissed && mode !== null

    const dismiss = () => {
        snoozeInstallPrompt()
        setIsDismissed(true)
    }

    const install = async () => {
        if (!deferredPrompt) return

        await deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice

        setDeferredPrompt(null)

        if (outcome === 'dismissed') dismiss()
    }

    return {
        mode,
        isOpen,
        install,
        dismiss
    }
}
