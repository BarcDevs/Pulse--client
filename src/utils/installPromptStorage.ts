import { dayInMs } from '@/constants/time'

export const INSTALL_PROMPT_SNOOZE_KEY = 'pulse:installPromptSnoozedUntil'
export const INSTALL_PROMPT_SNOOZE_DAYS = 14

export const isInstallPromptSnoozed = (): boolean => {
    try {
        const snoozedUntil = Number(localStorage.getItem(INSTALL_PROMPT_SNOOZE_KEY))

        return Date.now() < snoozedUntil
    } catch {
        return false
    }
}

export const snoozeInstallPrompt = (): void => {
    try {
        localStorage.setItem(
            INSTALL_PROMPT_SNOOZE_KEY,
            String(Date.now() + INSTALL_PROMPT_SNOOZE_DAYS * dayInMs)
        )
    } catch {
        // localStorage unavailable - the prompt may show again next visit
    }
}
