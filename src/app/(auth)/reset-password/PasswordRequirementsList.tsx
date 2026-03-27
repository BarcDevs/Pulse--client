import {RESET_PASSWORD} from '@/constants/authTexts'

import authFormConfig from '@/config/schema/authForm'

import {PasswordRequirementItem}
    from './PasswordRequirementItem'

type PasswordRequirementsListProps = {
    password: string
}

export const PasswordRequirementsList = ({
    password
}: PasswordRequirementsListProps) => {
    const hasMinLength =
        password.length >= authFormConfig
            .password.minLength
    const hasSpecialChar = authFormConfig
        .password.specialCharPattern.test(password)

    return (
        <div className={'flex items-center gap-6 text-sm'}>
            <PasswordRequirementItem
                isMet={hasMinLength}
                label={RESET_PASSWORD.minLengthText}
            />
            <PasswordRequirementItem
                isMet={hasSpecialChar}
                label={RESET_PASSWORD.specialCharText}
            />
        </div>
    )
}
