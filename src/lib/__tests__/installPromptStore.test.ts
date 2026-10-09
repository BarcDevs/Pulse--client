import {
    describe,
    expect,
    it,
    vi
} from 'vitest'

import {
    clearInstallPrompt,
    getInstallPrompt,
    subscribeToInstallPrompt
} from '@/lib/installPromptStore'

const fireInstallPrompt = () => {
    const event = new Event('beforeinstallprompt', { cancelable: true })

    window.dispatchEvent(event)

    return event
}

describe('installPromptStore', () => {
    it('captures beforeinstallprompt and prevents the browser mini-infobar', () => {
        const event = fireInstallPrompt()

        expect(getInstallPrompt()).toBe(event)
        expect(event.defaultPrevented).toBe(true)
    })

    it('notifies subscribers and stops after unsubscribe', () => {
        const listener = vi.fn()
        const unsubscribe = subscribeToInstallPrompt(listener)

        fireInstallPrompt()
        unsubscribe()
        fireInstallPrompt()

        expect(listener).toHaveBeenCalledTimes(1)
    })

    it('clears the prompt once the app is installed', () => {
        fireInstallPrompt()
        window.dispatchEvent(new Event('appinstalled'))

        expect(getInstallPrompt()).toBeNull()
    })

    it('clears the prompt on demand', () => {
        fireInstallPrompt()
        clearInstallPrompt()

        expect(getInstallPrompt()).toBeNull()
    })
})
