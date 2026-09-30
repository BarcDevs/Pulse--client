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
    fireEvent,
    render,
    screen,
    waitFor
} from '@testing-library/react'

import { DeactivateSection } from '@/components/settings/sections/DeactivateSection'

import { requestDeleteAccountCode } from '@/api/users'
import { settingsLocales } from '@/locales/settingsLocales'

vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key
}))

vi.mock('@/api/users', () => ({
    requestDeleteAccountCode: vi.fn()
}))

const deactivate = vi.fn()

vi.mock('@/hooks/mutations/useDeactivateAccount', () => ({
    useDeactivateAccount: () => ({
        mutateAsync: deactivate,
        isPending: false
    })
}))

const labels = settingsLocales.security.deactivate

const openDialog = () => {
    render(
        <QueryClientProvider client={new QueryClient()}>
            <DeactivateSection/>
        </QueryClientProvider>
    )
    fireEvent.click(screen.getByText(labels.buttonText))
}

// ==================== DeactivateSection ====================
describe(
    'DeactivateSection',
    () => {
        beforeEach(() => {
            vi.clearAllMocks()
        })

        it(
            'asks for an emailed code before offering the delete button',
            async () => {
                vi.mocked(requestDeleteAccountCode).mockResolvedValue()
                openDialog()

                expect(screen.queryByText(labels.confirmButton)).toBeNull()
                fireEvent.click(screen.getByText(labels.sendCodeButton))

                await waitFor(() => {
                    expect(screen.getByText(labels.otpDescription)).toBeInTheDocument()
                })
                expect(requestDeleteAccountCode).toHaveBeenCalled()
                expect(screen.getByText(labels.confirmButton)).toBeDisabled()
                expect(deactivate).not.toHaveBeenCalled()
            })

        it(
            'stays on the first step when sending the code fails',
            async () => {
                vi.mocked(requestDeleteAccountCode)
                    .mockRejectedValue(new Error('Too many requests'))
                openDialog()

                fireEvent.click(screen.getByText(labels.sendCodeButton))

                await waitFor(() => {
                    expect(screen.getByText('Too many requests')).toBeInTheDocument()
                })
                expect(screen.queryByText(labels.otpDescription)).toBeNull()
            })
    })
