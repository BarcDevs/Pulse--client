import {
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

import { HealthInterest } from '@/types/profile'

import { RecoveryIdentityPicker } from '@/components/profile/RecoveryIdentityPicker'

vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key
}))

vi.mock('@/hooks/profile/useProfileOptionsQuery', () => ({
    useProfileOptionsQuery: () => ({
        data: {
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
                },
                {
                    id: '3',
                    slug: 'physical-fitness',
                    name: 'Physical Fitness',
                    category: 'PHYSICAL',
                    description: '',
                    sortOrder: 3,
                    isActive: true
                }
            ]
        }
    })
}))

const selectedInterests: HealthInterest[] = [
    {
        id: '1',
        slug: 'mental-health',
        name: 'Mental Health',
        category: 'MENTAL',
        description: '',
        sortOrder: 1,
        isActive: true
    }
]

describe('RecoveryIdentityPicker', () => {
    it('renders all available interests', () => {
        render(
            <RecoveryIdentityPicker
                selected={selectedInterests}
                onCloseAction={vi.fn()}
            />
        )

        expect(screen.getByText('Mental Health')).toBeInTheDocument()
        expect(screen.getByText('Nutrition')).toBeInTheDocument()
        expect(screen.getByText('Physical Fitness')).toBeInTheDocument()
    })

    it('selected interests do not have opacity-50', () => {
        render(
            <RecoveryIdentityPicker
                selected={selectedInterests}
                onCloseAction={vi.fn()}
            />
        )

        const chip = screen.getByText('Mental Health').closest('button')!
        expect(chip.classList.contains('opacity-50')).toBe(false)
    })

    it('unselected interests have opacity-50', () => {
        render(
            <RecoveryIdentityPicker
                selected={selectedInterests}
                onCloseAction={vi.fn()}
            />
        )

        const nutrition = screen.getByText('Nutrition').closest('button')!
        const physical = screen.getByText('Physical Fitness').closest('button')!

        expect(nutrition.classList.contains('opacity-50')).toBe(true)
        expect(physical.classList.contains('opacity-50')).toBe(true)
    })

    it('clicking unselected chip selects it', async () => {
        const user = userEvent.setup()

        render(
            <RecoveryIdentityPicker
                selected={selectedInterests}
                onCloseAction={vi.fn()}
            />
        )

        const nutrition = screen.getByText('Nutrition').closest('button')!
        expect(nutrition.classList.contains('opacity-50')).toBe(true)

        await user.click(nutrition)

        expect(nutrition.classList.contains('opacity-50')).toBe(false)
    })

    it('clicking selected chip deselects it', async () => {
        const user = userEvent.setup()

        render(
            <RecoveryIdentityPicker
                selected={selectedInterests}
                onCloseAction={vi.fn()}
            />
        )

        const chip = screen.getByText('Mental Health').closest('button')!
        expect(chip.classList.contains('opacity-50')).toBe(false)

        await user.click(chip)

        expect(chip.classList.contains('opacity-50')).toBe(true)
    })

    it('Done button calls onCloseAction', async () => {
        const user = userEvent.setup()
        const onClose = vi.fn()

        render(
            <RecoveryIdentityPicker
                selected={selectedInterests}
                onCloseAction={onClose}
            />
        )

        await user.click(screen.getByText('profile.recoveryIdentity.done'))

        expect(onClose).toHaveBeenCalledOnce()
    })
})
