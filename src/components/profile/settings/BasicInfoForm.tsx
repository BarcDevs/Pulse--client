'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { DatePickerInput } from '@/components/shared/inputs/DatePickerInput'

import { useUser } from '@/hooks/ui/useUser'

import { ROUTES } from '@/constants/routes'

import { useProfileEditContext } from '@/context/ProfileEditContext'

import { profileLocales } from '@/locales/profileLocales'

import { EditTextField } from './EditTextField'
import { LocationField } from './LocationField'

export const BasicInfoForm = () => {
    const t = useTranslations()
    const { user } = useUser()
    const {
        userFields,
        profileFields,
        updateUserField,
        updateProfileField,
        errors
    } = useProfileEditContext()

    if (!user) return null

    return (
        <div className={'grid gap-4 sm:grid-cols-2'}>
            <div className={'flex gap-2'}>
                <EditTextField
                    className={'flex-1'}
                    label={t(profileLocales.basicInfo.firstName)}
                    value={userFields.firstName}
                    placeholder={t(profileLocales.basicInfo.firstName)}
                    error={errors.firstName}
                    onChangeAction={(v) => updateUserField('firstName', v)}
                />
                <EditTextField
                    className={'flex-1'}
                    label={t(profileLocales.basicInfo.lastName)}
                    value={userFields.lastName}
                    placeholder={t(profileLocales.basicInfo.lastName)}
                    error={errors.lastName}
                    onChangeAction={(v) => updateUserField('lastName', v)}
                />
            </div>

            <EditTextField
                label={t(profileLocales.basicInfo.username)}
                value={userFields.username}
                placeholder={t(profileLocales.basicInfo.username)}
                error={errors.username}
                onChangeAction={(v) => updateUserField('username', v)}
            />

            <div>
                <p className={'label-uppercase label-rtl text-muted-foreground mb-2'}>
                    {t(profileLocales.basicInfo.emailAddress)}
                </p>
                <p className={'text-sm text-muted-foreground'}>
                    {user.email}
                </p>
                <p className={'text-xs text-muted-foreground mt-1'}>
                    {`${t(profileLocales.basicInfo.emailNote)} `}
                    <Link
                        href={ROUTES.PROFILE_SETTINGS}
                        className={'underline hover:text-foreground'}
                    >
                        {t(profileLocales.basicInfo.emailNoteLink)}
                    </Link>
                </p>
            </div>

            <LocationField
                label={t(profileLocales.basicInfo.location)}
                value={profileFields.location}
                placeholder={t(profileLocales.basicInfo.location)}
                error={errors.location}
                onChangeAction={(v) => updateProfileField('location', v)}
            />

            <div>
                <p className={'label-uppercase label-rtl text-muted-foreground mb-2'}>
                    {t(profileLocales.basicInfo.dateOfBirth)}
                </p>
                <DatePickerInput
                    value={profileFields.dateOfBirth}
                    onChangeAction={(v) =>
                        updateProfileField('dateOfBirth', v)}
                    disabledDates={(date) => date > new Date()}
                />
            </div>

            <EditTextField
                label={t(profileLocales.basicInfo.recoveryType)}
                value={profileFields.recoveryType}
                placeholder={t(profileLocales.basicInfo.recoveryType)}
                onChangeAction={(v) => updateProfileField('recoveryType', v)}
            />

            <EditTextField
                label={t(profileLocales.basicInfo.careProvider)}
                value={profileFields.careProvider}
                placeholder={t(profileLocales.basicInfo.careProvider)}
                onChangeAction={(v) => updateProfileField('careProvider', v)}
            />
        </div>
    )
}
