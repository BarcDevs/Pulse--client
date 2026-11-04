import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query'
import {
    act,
    render
} from '@testing-library/react'

import type { Profile } from '@/types/profile'
import type { User } from '@/types/user'

import { authQueryKeys } from '@/constants/queryKeys'

import {
    ProfileEditProvider,
    useProfileEditContext
} from '@/context/ProfileEditContext'

const saveSettings = vi.fn()
const updateUser = vi.fn()

vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key
}))

vi.mock('sonner', () => ({
    toast: {
        error: vi.fn()
    }
}))

vi.mock('@/hooks/mutations/useSaveSettings', () => ({
    useSaveSettings: () => ({
        mutateAsync: saveSettings,
        isPending: false
    })
}))

vi.mock('@/hooks/mutations/useUpdateUser', () => ({
    useUpdateUser: () => ({
        mutateAsync: updateUser,
        isPending: false
    })
}))

const profile = {
    id: 'profile-1',
    userId: 'user-1',
    location: 'Haifa',
    bio: 'Hello',
    healthInterests: [],
    activityPreferences: [],
    dateOfBirth: '1990-05-04T00:00:00.000Z',
    recoveryType: 'Alcohol',
    careProvider: 'Dr. Cohen'
} as unknown as Profile

const user = {
    id: 'user-1',
    firstName: 'Dana',
    lastName: 'Levi',
    username: 'dana',
    email: 'dana@example.com',
    role: 'USER',
    createdAt: '2026-01-01T00:00:00.000Z',
    profile
} as User

vi.mock('@/hooks/ui/useUser', () => ({
    useUser: () => ({ user })
}))

type Edit = ReturnType<typeof useProfileEditContext>

const renderProvider = () => {
    const queryClient = new QueryClient()
    queryClient.setQueryData(authQueryKeys.getMe, {
        ...user,
        profile: undefined
    })
    queryClient.setQueryData(authQueryKeys.profile, profile)
    const captured = { edit: null as unknown as Edit }
    const Capture = () => {
        captured.edit = useProfileEditContext()
        return null
    }
    render(
        <QueryClientProvider client={queryClient}>
            <ProfileEditProvider>
                <Capture/>
            </ProfileEditProvider>
        </QueryClientProvider>
    )
    return {
        captured,
        queryClient
    }
}

beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    saveSettings.mockResolvedValue(undefined)
})

describe('ProfileEditContext profile fields', () => {
    it('fills date of birth, recovery type and care provider from the profile on edit start', () => {
        const { captured } = renderProvider()

        act(() => captured.edit.startEdit())

        expect(captured.edit.profileFields).toMatchObject({
            dateOfBirth: '1990-05-04',
            recoveryType: 'Alcohol',
            careProvider: 'Dr. Cohen'
        })
    })

    it('sends only the profile fields that changed', async () => {
        const { captured } = renderProvider()
        act(() => captured.edit.startEdit())
        act(() => captured.edit.updateProfileField('careProvider', 'Dr. Levi'))

        await act(() => captured.edit.handleSave())

        expect(saveSettings).toHaveBeenCalledTimes(1)
        const sent = saveSettings.mock.calls[0][0]
        expect(sent.careProvider).toBe('Dr. Levi')
        expect(sent).not.toHaveProperty('recoveryType')
        expect(sent).not.toHaveProperty('dateOfBirth')
    })

    it('sends nothing when no profile field changed', async () => {
        const { captured } = renderProvider()
        act(() => captured.edit.startEdit())

        await act(() => captured.edit.handleSave())

        expect(saveSettings).not.toHaveBeenCalled()
    })

    it('writes the changed fields into the profile cache optimistically', () => {
        const { captured, queryClient } = renderProvider()
        saveSettings.mockReturnValue(new Promise(() => {}))
        act(() => captured.edit.startEdit())
        act(() => captured.edit.updateProfileField('recoveryType', 'Drugs'))

        act(() => {
            void captured.edit.handleSave()
        })

        expect(queryClient.getQueryData<Profile>(authQueryKeys.profile))
            .toMatchObject({ recoveryType: 'Drugs' })
        expect(queryClient.getQueryData<User>(authQueryKeys.getMe))
            .not.toHaveProperty('recoveryType')
    })

    it('restores the profile cache when saving fails', async () => {
        const { captured, queryClient } = renderProvider()
        saveSettings.mockRejectedValue(new Error('boom'))
        act(() => captured.edit.startEdit())
        act(() => captured.edit.updateProfileField('recoveryType', 'Drugs'))

        await act(() => captured.edit.handleSave())

        expect(queryClient.getQueryData<Profile>(authQueryKeys.profile))
            .toMatchObject({ recoveryType: 'Alcohol' })
    })
})
