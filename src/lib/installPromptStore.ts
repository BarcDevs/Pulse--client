import { BeforeInstallPromptEvent } from '@/types/pwa'

type Listener = () => void

const listeners = new Set<Listener>()
let deferredPrompt: BeforeInstallPromptEvent | null = null

const setDeferredPrompt = (prompt: BeforeInstallPromptEvent | null) => {
    deferredPrompt = prompt
    listeners.forEach((listener) => listener())
}

// Chrome fires beforeinstallprompt once per page load, possibly before React
// hydrates, so it is captured when this module loads, not in an effect
if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault()
        setDeferredPrompt(event as BeforeInstallPromptEvent)
    })
    window.addEventListener('appinstalled', () => setDeferredPrompt(null))
}

export const subscribeToInstallPrompt = (listener: Listener) => {
    listeners.add(listener)

    return () => {
        listeners.delete(listener)
    }
}

export const getInstallPrompt = () => deferredPrompt

export const getServerInstallPrompt = () => null

export const clearInstallPrompt = () => setDeferredPrompt(null)
