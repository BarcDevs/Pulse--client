import {RESET_PASSWORD} from '@/constants/authTexts'

import {PasswordRequirementItem} from './PasswordRequirementItem'

type PasswordRequirementsListProps = {
    hasMinLength: boolean
    hasSpecialChar: boolean
}

export const PasswordRequirementsList = ({
    hasMinLength,
    hasSpecialChar
}: PasswordRequirementsListProps) => (
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
