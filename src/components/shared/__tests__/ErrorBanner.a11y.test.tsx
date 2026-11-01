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

import { ErrorBanner } from '@/components/shared/ErrorBanner'

describe('ErrorBanner a11y', () => {
    it('names the dismiss button', () => {
        render(<ErrorBanner error={new Error('x')}/>)

        expect(
            screen.getByRole('button', {
                name: globalLocales.a11y.dismiss
            })
        ).toBeTruthy()
    })
})
