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

import type { User } from '@/types/user'

import { useUser } from '@/hooks/ui/useUser'

import { BasicInfoView } from '../BasicInfoView'

vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key,
    useLocale: () => 'en-US'
}))

vi.mock('@/hooks/ui/useUser', () => ({
    useUser: vi.fn()
}))

const buildUser = (profile: Partial<User['profile']>) => ({
    id: 'user-1',
    firstName: 'Dana',
    lastName: 'Levi',
    username: 'dana',
    email: 'dana@example.com',
    role: 'USER',
    createdAt: '2026-01-01T00:00:00.000Z',
    profile: {
        id: 'profile-1',
        userId: 'user-1',
        ...profile
    }
}) as User

const mockUser = (user: User) =>
    vi.mocked(useUser).mockReturnValue({
        user,
        isAuthenticated: true,
        status: {
            isLoading: false,
            isError: false,
            error: null
        }
    })

beforeEach(() => {
    vi.clearAllMocks()
})

describe('BasicInfoView', () => {
    it('shows the profile date of birth, recovery type and care provider', () => {
        mockUser(buildUser({
            location: 'Haifa',
            dateOfBirth: '1990-05-04T00:00:00.000Z',
            recoveryType: 'Alcohol',
            careProvider: 'Dr. Cohen'
        }))

        render(<BasicInfoView/>)

        expect(screen.getByText(/1990/)).toBeInTheDocument()
        expect(screen.getByText('Alcohol')).toBeInTheDocument()
        expect(screen.getByText('Dr. Cohen')).toBeInTheDocument()
        expect(screen.queryByText('profile.basicInfo.notSet')).not.toBeInTheDocument()
    })

    it('shows not set when the profile has none of the three fields', () => {
        mockUser(buildUser({}))

        render(<BasicInfoView/>)

        expect(screen.getAllByText('profile.basicInfo.notSet')).toHaveLength(4)
    })
})
