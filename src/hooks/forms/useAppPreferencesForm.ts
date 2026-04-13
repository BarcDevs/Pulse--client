import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import type { Theme } from '@/types'

import {
    type AppPreferencesSchema,
    appPreferencesSchema
} from '@/validations/forms/settingsSchema'

type UseAppPreferencesFormProps = {
    theme?: Theme
    language?: string
}

export const useAppPreferencesForm = ({
    theme = 'light',
    language = 'en-US'
}: UseAppPreferencesFormProps = {}) => {
    const form = useForm<AppPreferencesSchema>({
        resolver: zodResolver(appPreferencesSchema),
        defaultValues: {
            theme,
            language
        }
    })

    return { form }
}
