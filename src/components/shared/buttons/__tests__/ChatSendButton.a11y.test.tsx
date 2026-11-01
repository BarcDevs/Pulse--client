import {
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { render, screen } from '@testing-library/react'

import { globalLocales } from '@/locales/globalLocales'

vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key
}))

import { ChatSendButton } from '@/components/shared/buttons/ChatSendButton'

describe('ChatSendButton a11y', () => {
    it('names the send button', () => {
        render(<ChatSendButton/>)

        expect(
            screen.getByRole('button', {
                name: globalLocales.a11y.sendMessage
            })
        ).toBeTruthy()
    })
})
