'use client'

import { Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { useUser } from '@/hooks/ui/useUser'

import { profilePageTexts } from '@/constants/componentTexts/profile'

export const ProfileBasicInfo = () => {
    const { user } = useUser()

    if (!user)
        return null

    // TODO: Add legal name, date of birth, and primary support contact to Profile type
    // TODO: extract constant
    const infoFields = [
        {
            label: profilePageTexts
                .basicInfo.fields[0].label,
            value: user.email
        },
        {
            label: profilePageTexts
                .basicInfo.fields[1].label,
            value: profilePageTexts
                .basicInfo.fields[1].value
        },
        {
            label: profilePageTexts
                .basicInfo.fields[2].label,
            value: profilePageTexts
                .basicInfo.fields[2].value
        },
        {
            label: profilePageTexts
                .basicInfo.fields[3].label,
            value: profilePageTexts
                .basicInfo.fields[3].value
        }
    ]

    return (
        <Card className={'border-0 shadow-sm'}>
            <CardHeader className={'flex flex-row items-center justify-between'}>
                <CardTitle className={'text-lg font-semibold'}>
                    {profilePageTexts.basicInfo.title}
                </CardTitle>
                <Button
                    variant={'ghost'}
                    size={'sm'}
                    className={'gap-2 text-primary'}
                >
                    <Pencil className={'size-4'}/>
                    {profilePageTexts.basicInfo.edit}
                </Button>
            </CardHeader>
            <CardContent>
                <div className={'grid gap-6 sm:grid-cols-2'}>
                    {infoFields.map((field) => (
                        <div key={field.label}>
                            <p className={'text-xs font-medium uppercase tracking-wider text-muted-foreground'}>
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
