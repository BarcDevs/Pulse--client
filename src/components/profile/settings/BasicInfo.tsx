'use client'

import { useTranslations } from 'next-intl'

import { Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { useUser } from '@/hooks/ui/useUser'

import { profileLocales } from '@/locales/profileLocales'

export const ProfileBasicInfo = () => {
    const t = useTranslations()
    const { user } = useUser()

    if (!user)
        return null

    // todo: remove mocks
    const infoFields = [
        {
            label: t(profileLocales.basicInfo.fullName),
            value: 'Alexander J. Rivera'
        },
        {
            label: t(profileLocales.basicInfo.emailAddress),
            value: user.email
        },
        {
            label: t(profileLocales.basicInfo.dateOfBirth),
            value: 'May 12, 1992'
        },
        {
            label: t(profileLocales.basicInfo.primarySupportContact),
            value: 'Dr. Sarah Chen (Clinician)'
        }
    ]

    return (
        <Card className={'border-0 shadow-sm'}>
            <CardHeader className={'flex-row-center-between'}>
                <CardTitle className={'text-lg font-semibold'}>
                    {t(profileLocales.basicInfo.title)}
                </CardTitle>
                <Button
                    variant={'ghost'}
                    size={'sm'}
                    className={'justify-start gap-2 text-primary w-fit'}
                >
                    <Pencil className={'size-4'}/>
                    {t(profileLocales.basicInfo.edit)}
                </Button>
            </CardHeader>
            <CardContent>
                <div className={'grid gap-6 sm:grid-cols-2'}>
                    {infoFields.map((field) => (
                        <div key={field.label}>
                            <p className={'label-uppercase text-muted-foreground rtl:normal-case rtl:tracking-normal rtl:font-semibold rtl:text-sm'}>
                                {field.label}
                            </p>
                            <p className={'mt-1 text-sm font-medium text-foreground'}>
                                {field.value ?? '-'}
                            </p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
