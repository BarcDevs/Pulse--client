'use client'

import { useTranslations } from 'next-intl'

import { UseFormReturn } from 'react-hook-form'

import { SettingToggle } from '@/components/shared/inputs/SettingToggle'
import { FormField } from '@/components/ui/form'

import { communityLocales } from '@/locales/communityLocales'
import { type PostFormSchema } from '@/validations/forms/postFormSchema'

type PostFormAnonymousToggleProps = {
    form: UseFormReturn<PostFormSchema>
}

export const PostFormAnonymousToggle = ({
    form
}: PostFormAnonymousToggleProps) => {
    const t = useTranslations()

    return (
        <FormField
            control={form.control}
            name={'isAnonymous'}
            render={({ field }) => (
                <SettingToggle
                    label={t(communityLocales.postForm.anonymous)}
                    description={t(communityLocales.postForm.anonymousHint)}
                    checked={field.value ?? true}
                    onChangeAction={field.onChange}
                />
            )}
        />
    )
}
