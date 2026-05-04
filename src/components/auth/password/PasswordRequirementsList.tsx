'use client'

import { useTranslations } from 'next-intl'

import authFormConfig from '@/config/schema/authForm'

import { authLocales } from '@/locales/authLocales'

import { PasswordRequirementItem }
    from './PasswordRequirementItem'

type PasswordRequirementsListProps = {
    password: string
}

export const PasswordRequirementsList = ({
    password
}: PasswordRequirementsListProps) => {
    const t = useTranslations()
    const hasMinLength =
        password.length >= authFormConfig
            .password.minLength
    const hasSpecialChar = authFormConfig
        .password.specialCharPattern.test(password)

    return (
        <div className={'flex items-center gap-6 text-sm'}>
            <PasswordRequirementItem
                isMet={hasMinLength}
                label={t(authLocales.resetPassword.minLengthText)}
            />
            <PasswordRequirementItem
                isMet={hasSpecialChar}
                label={t(authLocales.resetPassword.specialCharText)}
            />
        </div>
    )
}
