import {
    useState,
    useSyncExternalStore
} from 'react'

import { useIsMobile } from '@/hooks/ui/useMobile'

import {
    clearInstallPrompt,
    getInstallPrompt,
    getServerInstallPrompt,
    subscribeToInstallPrompt
} from '@/lib/installPromptStore'
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
    const deferredPrompt = useSyncExternalStore(
        subscribeToInstallPrompt,
        getInstallPrompt,
        getServerInstallPrompt
    )
    const [isDismissed, setIsDismissed] = useState(false)

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

        clearInstallPrompt()

        if (outcome === 'dismissed') dismiss()
    }

    return {
        mode,
        isOpen,
        install,
        dismiss
    }
}
