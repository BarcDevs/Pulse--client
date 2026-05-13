'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { profileLocales } from '@/locales/profileLocales'

import { BasicInfoForm } from './BasicInfoForm'
import { BasicInfoView } from './BasicInfoView'

export const ProfileBasicInfo = () => {
    const t = useTranslations()
    const [isEditing, setIsEditing] = useState(false)

    return (
        <Card className={'border-0 shadow-sm'}>
            <CardHeader>
                <CardTitle className={'text-lg font-semibold'}>
                    {t(profileLocales.basicInfo.title)}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isEditing
                    ? <BasicInfoForm onCancelAction={() => setIsEditing(false)}/>
                    : <BasicInfoView onEditAction={() => setIsEditing(true)}/>
                }
            </CardContent>
        </Card>
    )
}
