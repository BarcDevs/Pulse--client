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

import {
    clearResetEmail,
    getResetEmail,
    saveResetEmail
} from '@/utils/resetEmail'

import ForgotPasswordPage from '@/app/(auth)/forgot-password/page'
import ResetPasswordPage from '@/app/(auth)/reset-password/page'

const push = vi.fn()
const replace = vi.fn()

vi.mock('sonner', () => ({
    toast: { success: vi.fn(), error: vi.fn() }
}))

vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key
}))

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push, replace })
}))

vi.mock('@/components/shared/brand/Logo', () => ({
    Logo: () => null
}))

vi.mock('@/api/auth', () => ({
    requestPasswordReset: vi.fn(),
    verifyResetCode: vi.fn(),
    resetPassword: vi.fn()
}))

const {
    requestPasswordReset,
    verifyResetCode,
    resetPassword
} = await import('@/api/auth')

// Password inputs sit inside a show/hide wrapper, so select by field name
const fillInput = (name: string, value: string) =>
    fireEvent.change(
        document.querySelector(`input[name="${name}"]`)!,
        { target: { value } }
    )

const goToPasswordStep = async (otp = '123456') => {
    vi.mocked(verifyResetCode).mockResolvedValue()
    fillInput('otp', otp)
    fireEvent.click(screen.getByTestId('verifyResetCode-submit'))
    await waitFor(() => expect(verifyResetCode).toHaveBeenCalled())
}

describe('password reset pages', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        clearResetEmail()
    })

    it('forgot-password requests a code and moves to the reset step without putting the email in the URL', async () => {
        vi.mocked(requestPasswordReset).mockResolvedValue()
        render(<ForgotPasswordPage/>)

        fillInput('email', 'user@test.com')
        fireEvent.click(screen.getByTestId('forgotPassword-submit'))

        await waitFor(() => expect(push).toHaveBeenCalledWith(
            '/reset-password'
        ))
        expect(requestPasswordReset).toHaveBeenCalledWith('user@test.com')
        expect(getResetEmail()).toBe('user@test.com')
        expect(JSON.stringify(push.mock.calls)).not.toContain('user')
    })

    it('reset-password without an email goes back to the request step', () => {
        render(<ResetPasswordPage/>)

        expect(replace).toHaveBeenCalledWith('/forgot-password')
    })

    it('reset-password verifies the code without consuming it, then asks for a new password', async () => {
        saveResetEmail('user@test.com')
        render(<ResetPasswordPage/>)

        await goToPasswordStep('123456')

        expect(verifyResetCode).toHaveBeenCalledWith({
            email: 'user@test.com',
            userOTP: 123456
        })
        expect(await screen.findByTestId('resetPassword-submit')).toBeTruthy()
    })

    it('reset-password shows an inline error on a wrong code and stays on the code step', async () => {
        saveResetEmail('user@test.com')
        vi.mocked(verifyResetCode).mockRejectedValue(new Error('Invalid code'))
        render(<ResetPasswordPage/>)

        fillInput('otp', '000000')
        fireEvent.click(screen.getByTestId('verifyResetCode-submit'))

        expect(await screen.findByText('Invalid code')).toBeTruthy()
        expect(resetPassword).not.toHaveBeenCalled()
    })

    it('reset-password sends the verified code and new password, then returns to login', async () => {
        saveResetEmail('user@test.com')
        vi.mocked(resetPassword).mockResolvedValue()
        render(<ResetPasswordPage/>)

        await goToPasswordStep('123456')

        fillInput('password', 'NewPassword1')
        fillInput('confirmPassword', 'NewPassword1')
        fireEvent.click(screen.getByTestId('resetPassword-submit'))

        await waitFor(() => expect(push).toHaveBeenCalledWith('/login'))
        expect(resetPassword).toHaveBeenCalledWith({
            email: 'user@test.com',
            newPassword: 'NewPassword1',
            userOTP: 123456
        })
        expect(getResetEmail()).toBeNull()
    })

    it('reset-password sends the user back to the code step when the code is rejected on submit', async () => {
        saveResetEmail('user@test.com')
        vi.mocked(resetPassword).mockRejectedValue({
            response: {
                data: {
                    error: [{ code: 'AUTH_RESET_PASSWORD' }]
                }
            }
        })
        render(<ResetPasswordPage/>)

        await goToPasswordStep('123456')

        fillInput('password', 'NewPassword1')
        fillInput('confirmPassword', 'NewPassword1')
        fireEvent.click(screen.getByTestId('resetPassword-submit'))

        expect(await screen.findByTestId('verifyResetCode-submit')).toBeTruthy()
        expect(push).not.toHaveBeenCalled()
    })
})
