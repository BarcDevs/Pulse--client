export type FieldType =
    'text' |
    'email' |
    'password' |
    'textarea' |
    'checkbox' |
    'select' |
    'radio' |
    'slider' |
    'otp'

export type SelectOption = {
    label: string
    value: string
}

export type FieldConfig = {
    type: FieldType
    label?: string
    placeholder?: string
    description?: string
    required?: boolean
    disabled?: boolean
    maxLength?: number
    minLength?: number
    min?: number
    max?: number
    step?: number
    rows?: number
    options?: SelectOption[]
    pattern?: string
    className?: string
}

export type FormButtonConfig = {
    label: string
    loadingLabel: string
}

export type FormLinkConfig = {
    label: string
    href: string
}

export type FormConfig = {
    fields: Record<string, FieldConfig>
    buttons: {
        primary: FormButtonConfig
        secondary?: FormButtonConfig
    }
    links?: FormLinkConfig[]
    helpText?: string
    title?: string
    description?: string
}

export type AuthFormType =
    'login' |
    'signup' |
    'forgotPassword' |
    'resetPassword'
