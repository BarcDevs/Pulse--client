'use client'

import { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { toast } from 'sonner'

import { NewPasswordStep } from '@/components/auth/steps/NewPasswordStep'
import { VerifyCodeStep } from '@/components/auth/steps/VerifyCodeStep'
import { Logo } from '@/components/shared/brand/Logo'

import { ROUTES } from '@/constants/routes'

import { authLocales } from '@/locales/authLocales'

type Step = 'code' | 'password'

const ResetPasswordPage = () => {
    const t = useTranslations()
    const router = useRouter()
    const email = useSearchParams().get('email')
    const [step, setStep] = useState<Step>('code')
    const [otp, setOtp] = useState('')

    // The code is tied to an email; without one, start from the request step
    useEffect(() => {
        if (!email) router.replace(ROUTES.FORGOT_PASSWORD)
    }, [email, router])

    if (!email) return null

    const handleSuccess = () => {
        toast.success(t(authLocales.resetPassword.successToast))
        router.push(ROUTES.LOGIN)
    }

    return (
        <div className={'w-full max-w-md'}>
            <Logo/>

            {step === 'code'
                ? (
                    <VerifyCodeStep
                        email={email}
                        onVerifiedAction={(verifiedOtp) => {
                            setOtp(verifiedOtp)
                            setStep('password')
                        }}
                    />
                )
                : (
                    <NewPasswordStep
                        email={email}
                        otp={otp}
                        onCodeRejectedAction={() => setStep('code')}
                        onSuccessAction={handleSuccess}
                    />
                )
            }
        </div>
    )
}

export default ResetPasswordPage
