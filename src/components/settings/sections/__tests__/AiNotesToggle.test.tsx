import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import {
    fireEvent,
    render,
    screen
} from '@testing-library/react'

import { AiNotesToggle } from '@/components/settings/sections/AiNotesToggle'

import { useSettings } from '@/context/SettingsContext'

vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key
}))

vi.mock('@/context/SettingsContext', () => ({
    useSettings: vi.fn()
}))

const onSettingChange = vi.fn()

const renderWith = (shareNotesWithAI?: boolean) => {
    vi.mocked(useSettings).mockReturnValue({
        settings: { shareNotesWithAI },
        onSettingChange
    } as any)
    render(<AiNotesToggle/>)
    return screen.getByRole('switch')
}

// ==================== AiNotesToggle ====================
describe(
    'AiNotesToggle',
    () => {
        beforeEach(() => {
            vi.clearAllMocks()
        })

        it(
            'is on by default, matching the server default',
            () => {
                expect(renderWith(undefined)).toHaveAttribute('aria-checked', 'true')
            })

        it(
            'turns note sharing off',
            () => {
                fireEvent.click(renderWith(true))
                expect(onSettingChange)
                    .toHaveBeenCalledWith('shareNotesWithAI', false)
            })
    })
