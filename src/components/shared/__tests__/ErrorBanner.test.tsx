import {
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { render } from '@testing-library/react'

import { ErrorBanner } from '@/components/shared/ErrorBanner'

import { globalLocales } from '@/locales/globalLocales'

vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key
}))

describe('ErrorBanner', () => {
    it('shows the localized headline for an aborted request', () => {
        const error = Object.assign(
            new Error('Request aborted'),
            { code: 'ECONNABORTED' }
        )

        const { container } = render(<ErrorBanner error={error}/>)

        expect(container.querySelector('p')?.textContent)
            .toBe(globalLocales.errors.inline.aborted)
    })

    it('renders nothing without an error', () => {
        const { container } = render(<ErrorBanner error={null}/>)

        expect(container.firstChild).toBeNull()
    })
})
