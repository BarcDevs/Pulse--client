import {
    describe,
    expect,
    it,
    vi
} from 'vitest'

import {
    act,
    render,
    waitFor
} from '@testing-library/react'
import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query'

import type { User } from '@/types/user'

import { authQueryKeys } from '@/constants/queryKeys'

vi.mock('next/navigation', () => ({
    usePathname: () => '/'
}))

vi.mock('@/api/auth', () => ({
    getMe: vi.fn()
}))

vi.mock('@/lib/auth', () => ({
    authState: {},
    initiateLogout: vi.fn()
}))

vi.mock('@/utils/draftStorage', () => ({
    sweepExpiredDrafts: vi.fn()
}))

import { AuthProvider } from '@/context/AuthProvider'
import {
    useAuth
} from '@/context/AuthContext'

const newUser = {
    id: 'user-1',
    email: 'new@example.com',
    username: 'tester',
    role: 'USER'
} as User

describe('AuthProvider.setUser', () => {
    it('writes a plain User into the getMe cache', async () => {
        const queryClient = new QueryClient()
        let setUser: (user: User | null) => void = () => {}
        const Capture = () => {
            setUser = useAuth().setUser
            return null
        }

        render(
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Capture/>
                </AuthProvider>
            </QueryClientProvider>
        )

        act(() => setUser(newUser))

        await waitFor(() => {
            expect(
                queryClient.getQueryData(authQueryKeys.getMe)
            ).toEqual(newUser)
        })
    })
})
