import { useTranslations } from 'next-intl'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { profileLocales } from '@/locales/profileLocales'

import { BasicInfoView } from './BasicInfoView'

export const ProfileBasicInfo = () => {
    const t = useTranslations()

    return (
        <Card className={'border-0 shadow-sm'}>
            <CardHeader>
                <CardTitle className={'text-lg font-semibold'}>
                    {t(profileLocales.basicInfo.title)}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* TODO: show BasicInfoForm when global isEditing is true */}
                <BasicInfoView/>
            </CardContent>
        </Card>
    )
}
