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

vi.mock('@/hooks/ui/useUser', () => ({
    useUser: () => ({
        status: { isLoading: false },
        user: {
            firstName: 'A',
            lastName: 'B',
            createdAt: '2026-01-01'
        }
    })
}))

vi.mock('@/config/features', () => ({
    FEATURES: {
        profileImageUpload: true,
        profileLevel: false
    }
}))

vi.mock('@/components/profile/info/ProfileInfo', () => ({
    ProfileInfo: () => null
}))

vi.mock('@/components/profile/stats/ProfileStats', () => ({
    ProfileStats: () => null
}))

import { ProfileCard } from '@/components/profile/info/ProfileCard'

describe('ProfileCard a11y', () => {
    it('names the upload photo button', () => {
        render(<ProfileCard/>)

        expect(
            screen.getByRole('button', {
                name: globalLocales.a11y.uploadPhoto
            })
        ).toBeTruthy()
    })
})
