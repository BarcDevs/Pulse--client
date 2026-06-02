'use client'

import { useTranslations } from 'next-intl'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { useProfileEditContext } from '@/context/ProfileEditContext'

import { profileLocales } from '@/locales/profileLocales'

import { BasicInfoForm } from './BasicInfoForm'
import { BasicInfoView } from './BasicInfoView'

export const ProfileBasicInfo = () => {
    const t = useTranslations()
    const { isEditing } = useProfileEditContext()

    return (
        <Card className={'border-0 shadow-sm'}>
            <CardHeader className={'pb-5'}>
                <CardTitle className={'text-base font-semibold'}>
                    {t(profileLocales.basicInfo.title)}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isEditing
                    ? <BasicInfoForm/>
                    : <BasicInfoView/>
                }
            </CardContent>
        </Card>
    )
}
