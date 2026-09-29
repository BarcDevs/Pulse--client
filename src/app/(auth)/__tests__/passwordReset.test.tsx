import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import {
    fireEvent,
    render,
    screen,
    waitFor
} from '@testing-library/react'

import ForgotPasswordPage from '@/app/(auth)/forgot-password/page'
import ResetPasswordPage from '@/app/(auth)/reset-password/page'

const push = vi.fn()
const replace = vi.fn()
let searchParams = new URLSearchParams()

vi.mock('sonner', () => ({
    toast: { success: vi.fn(), error: vi.fn() }
}))

vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key
}))

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push, replace }),
    useSearchParams: () => searchParams
}))

vi.mock('@/components/shared/brand/Logo', () => ({
    Logo: () => null
}))

vi.mock('@/api/auth', () => ({
    requestPasswordReset: vi.fn(),
    resetPassword: vi.fn()
}))

const { requestPasswordReset, resetPassword } = await import('@/api/auth')

// Password inputs sit inside a show/hide wrapper, so select by field name
const fillInput = (name: string, value: string) =>
    fireEvent.change(
        document.querySelector(`input[name="${name}"]`)!,
        { target: { value } }
    )

describe('password reset pages', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        searchParams = new URLSearchParams()
    })

    it('forgot-password requests a code and moves to the reset step with the email', async () => {
        vi.mocked(requestPasswordReset).mockResolvedValue()
        render(<ForgotPasswordPage/>)

        fillInput('email', 'user@test.com')
        fireEvent.click(screen.getByTestId('forgotPassword-submit'))

        await waitFor(() => expect(push).toHaveBeenCalledWith(
            '/reset-password?email=user%40test.com'
        ))
        expect(requestPasswordReset).toHaveBeenCalledWith('user@test.com')
    })

    it('reset-password without an email goes back to the request step', () => {
        render(<ResetPasswordPage/>)

        expect(replace).toHaveBeenCalledWith('/forgot-password')
    })

    it('reset-password sends the code as a number and returns to login', async () => {
        searchParams = new URLSearchParams({ email: 'user@test.com' })
        vi.mocked(resetPassword).mockResolvedValue()
        render(<ResetPasswordPage/>)

        fillInput('otp', '123456')
        fillInput('password', 'NewPassword1')
        fillInput('confirmPassword', 'NewPassword1')
        fireEvent.click(screen.getByTestId('resetPassword-submit'))

        await waitFor(() => expect(push).toHaveBeenCalledWith('/login'))
        expect(resetPassword).toHaveBeenCalledWith({
            email: 'user@test.com',
            newPassword: 'NewPassword1',
            userOTP: 123456
        })
    })

    it('reset-password shows the server error and stays on the page', async () => {
        searchParams = new URLSearchParams({ email: 'user@test.com' })
        vi.mocked(resetPassword).mockRejectedValue(new Error('Invalid code'))
        render(<ResetPasswordPage/>)

        fillInput('otp', '000000')
        fillInput('password', 'NewPassword1')
        fillInput('confirmPassword', 'NewPassword1')
        fireEvent.click(screen.getByTestId('resetPassword-submit'))

        expect(await screen.findByText('Invalid code')).toBeTruthy()
        expect(push).not.toHaveBeenCalled()
    })
})
