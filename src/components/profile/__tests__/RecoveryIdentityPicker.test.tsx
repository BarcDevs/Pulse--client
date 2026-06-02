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

import { RecoveryIdentityPicker } from '@/components/profile/RecoveryIdentityPicker'

const toggleProfileItem = vi.fn()

vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key,
    useLocale: () => 'en-US'
}))

vi.mock('@/context/ProfileEditContext', () => ({
    useProfileEditContext: () => ({
        profileFields: {
            location: '',
            bio: '',
            healthInterests: ['mental-health'],
            activityPreferences: []
        },
        toggleProfileItem
    })
}))

describe('RecoveryIdentityPicker', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the full interest catalog', () => {
        render(<RecoveryIdentityPicker/>)

        expect(screen.getByText('Mental Health')).toBeInTheDocument()
        expect(screen.getByText('Nutrition')).toBeInTheDocument()
        expect(screen.getByText('Physical Fitness')).toBeInTheDocument()
        expect(screen.getByText('Peer Support')).toBeInTheDocument()
    })

    it('selected interest does not have the unselected border', () => {
        render(<RecoveryIdentityPicker/>)

        const chip = screen.getByText('Mental Health').closest('button')!
        expect(chip.classList.contains('border-border')).toBe(false)
    })

    it('unselected interest has the unselected border', () => {
        render(<RecoveryIdentityPicker/>)

        const nutrition = screen.getByText('Nutrition').closest('button')!
        expect(nutrition.classList.contains('border-border')).toBe(true)
    })

    it('clicking an unselected chip toggles it on', async () => {
        const user = userEvent.setup()

        render(<RecoveryIdentityPicker/>)

        await user.click(screen.getByText('Nutrition').closest('button')!)

        expect(toggleProfileItem).toHaveBeenCalledWith('healthInterests', 'nutrition')
    })

    it('clicking a selected chip toggles it off', async () => {
        const user = userEvent.setup()

        render(<RecoveryIdentityPicker/>)

        await user.click(screen.getByText('Mental Health').closest('button')!)

        expect(toggleProfileItem).toHaveBeenCalledWith('healthInterests', 'mental-health')
    })
})
