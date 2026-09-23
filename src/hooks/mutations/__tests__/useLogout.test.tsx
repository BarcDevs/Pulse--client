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
    renderHook,
    waitFor
} from '@testing-library/react'

import { useLogout } from '@/hooks/mutations/useLogout'

const setNetworkError = vi.fn()
const push = vi.fn()
const logoutApi = vi.fn()

vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }))
vi.mock('@/context/AuthContext', () => ({
    useAuth: () => ({ setNetworkError })
}))
vi.mock('@/api/auth', () => ({ logout: () => logoutApi() }))

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={new QueryClient()}>
        {children}
    </QueryClientProvider>
)

describe('useLogout', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('logs out locally and shows the network bar when offline', async () => {
        const error = Object.assign(new Error('Network Error'), {
            code: 'ERR_NETWORK'
        })
        logoutApi.mockRejectedValue(error)
        const { result } = renderHook(() => useLogout(), { wrapper })

        act(() => result.current.actions.logout())

        await waitFor(() => expect(setNetworkError).toHaveBeenCalledWith(error))
        expect(push).toHaveBeenCalledWith('/')
    })

    it('navigates home on success', async () => {
        logoutApi.mockResolvedValue(undefined)
        const { result } = renderHook(() => useLogout(), { wrapper })

        act(() => result.current.actions.logout())

        await waitFor(() => expect(push).toHaveBeenCalledWith('/'))
        expect(setNetworkError).not.toHaveBeenCalled()
    })
})
