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
import userEvent from '@testing-library/user-event'

import { RecoveryIdentity } from '@/components/profile/RecoveryIdentity'

import { useUser } from '@/hooks/ui/useUser'

vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key
}))

vi.mock('@/hooks/ui/useUser', () => ({
    useUser: vi.fn()
}))

vi.mock('@/components/shared/EmptyState', () => ({
    EmptyState: ({ message }: { message: string }) => (
        <div data-testid={'empty-state'}>{message}</div>
    )
}))

vi.mock('@/components/profile/RecoveryIdentityPicker', () => ({
    RecoveryIdentityPicker: ({
        onCloseAction
    }: {
        onCloseAction: () => void
    }) => (
        <div data-testid={'recovery-identity-picker'}>
            <button onClick={onCloseAction}>Done</button>
        </div>
    )
}))

const withInterests = () =>
    vi.mocked(useUser).mockReturnValue({
        user: {
            profile: {
                healthInterests: [
                    {
                        id: '1',
                        slug: 'mental-health',
                        name: 'Mental Health',
                        category: 'MENTAL',
                        description: '',
                        sortOrder: 1,
                        isActive: true
                    },
                    {
                        id: '2',
                        slug: 'nutrition',
                        name: 'Nutrition',
                        category: 'LIFESTYLE',
                        description: '',
                        sortOrder: 2,
                        isActive: true
                    }
                ]
            }
        }
    } as any)

const withNoInterests = () =>
    vi.mocked(useUser).mockReturnValue({
        user: { profile: { healthInterests: [] } }
    } as any)

beforeEach(() => {
    withInterests()
})

describe('RecoveryIdentity', () => {
    it('renders user interests in view mode', () => {
        render(<RecoveryIdentity/>)

        expect(screen.getByText('Mental Health')).toBeInTheDocument()
        expect(screen.getByText('Nutrition')).toBeInTheDocument()
    })

    it('shows Edit button in view mode', () => {
        render(<RecoveryIdentity/>)

        expect(
            screen.getByText('profile.recoveryIdentity.edit')
        ).toBeInTheDocument()
    })

    it('shows EmptyState when user has no interests', () => {
        withNoInterests()
        render(<RecoveryIdentity/>)

        expect(screen.getByTestId('empty-state')).toBeInTheDocument()
    })

    it('clicking Edit shows picker and hides Edit button', async () => {
        const user = userEvent.setup()
        render(<RecoveryIdentity/>)

        await user.click(screen.getByText('profile.recoveryIdentity.edit'))

        expect(
            screen.getByTestId('recovery-identity-picker')
        ).toBeInTheDocument()
        expect(
            screen.queryByText('profile.recoveryIdentity.edit')
        ).not.toBeInTheDocument()
    })

    it('closing picker returns to view mode', async () => {
        const user = userEvent.setup()
        render(<RecoveryIdentity/>)

        await user.click(screen.getByText('profile.recoveryIdentity.edit'))
        await user.click(screen.getByText('Done'))

        expect(
            screen.queryByTestId('recovery-identity-picker')
        ).not.toBeInTheDocument()
        expect(screen.getByText('Mental Health')).toBeInTheDocument()
        expect(
            screen.getByText('profile.recoveryIdentity.edit')
        ).toBeInTheDocument()
    })
})
