import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import {
    INSTALL_PROMPT_SNOOZE_DAYS,
    isInstallPromptSnoozed,
    snoozeInstallPrompt
} from '@/utils/installPromptStorage'

import { dayInMs } from '@/constants/time'

describe('installPromptStorage', () => {
    beforeEach(() => {
        localStorage.clear()
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('is not snoozed before any dismissal', () => {
        expect(isInstallPromptSnoozed()).toBe(false)
    })

    it('is snoozed right after a dismissal', () => {
        snoozeInstallPrompt()

        expect(isInstallPromptSnoozed()).toBe(true)
    })

    it('is still snoozed just before the snooze window ends', () => {
        snoozeInstallPrompt()
        vi.advanceTimersByTime(INSTALL_PROMPT_SNOOZE_DAYS * dayInMs - 1)

        expect(isInstallPromptSnoozed()).toBe(true)
    })

    it('is not snoozed once the window has passed', () => {
        snoozeInstallPrompt()
        vi.advanceTimersByTime(INSTALL_PROMPT_SNOOZE_DAYS * dayInMs)

        expect(isInstallPromptSnoozed()).toBe(false)
    })

    it('is not snoozed when localStorage throws', () => {
        vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
            throw new Error('blocked')
        })

        expect(isInstallPromptSnoozed()).toBe(false)
    })
})
