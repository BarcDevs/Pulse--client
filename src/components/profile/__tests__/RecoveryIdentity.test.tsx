import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import {
    render,
    screen
} from '@testing-library/react'

import { RecoveryIdentity } from '@/components/profile/RecoveryIdentity'

vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key,
    useLocale: () => 'en-US'
}))

vi.mock('@/hooks/ui/useUser', () => ({
    useUser: vi.fn()
}))

vi.mock('@/components/profile/RecoveryInterestList', () => ({
    RecoveryInterestList: () => <div data-testid={'recovery-interest-list'}/>
}))

vi.mock('@/components/profile/RecoveryQuote', () => ({
    RecoveryQuote: () => <div data-testid={'recovery-quote'}/>
}))

beforeEach(() => {
    vi.clearAllMocks()
})

describe('RecoveryIdentity', () => {
    it('renders title and subtitle', () => {
        render(<RecoveryIdentity/>)

        expect(screen.getByText('profile.recoveryIdentity.title')).toBeInTheDocument()
        expect(screen.getByText('profile.recoveryIdentity.subtitle')).toBeInTheDocument()
    })

    it('renders interest list and quote', () => {
        render(<RecoveryIdentity/>)

        expect(screen.getByTestId('recovery-interest-list')).toBeInTheDocument()
        expect(screen.getByTestId('recovery-quote')).toBeInTheDocument()
    })
})
