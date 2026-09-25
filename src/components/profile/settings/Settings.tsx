import { useTranslations } from 'next-intl'

import { TileButton } from '@/components/shared/buttons/TileButton'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { profileSettingsWithIcons } from '@/constants/mappings/profile'

import { profileLocales } from '@/locales/profileLocales'

export const ProfileSettings = () => {
    const t = useTranslations()

    return (
        <Card className={'border-0 shadow-sm'}>
            <CardHeader>
                <CardTitle className={'text-lg font-semibold'}>
                    {t(profileLocales.settings.title)}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className={'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
                    {profileSettingsWithIcons.map((setting) => (
                        <TileButton key={setting.title}>
                            <div className={'flex size-12 items-center justify-center rounded-xl bg-primary-light'}>
                                <setting.icon className={'size-6 text-primary'}/>
                            </div>
                            <h4 className={'mt-3 font-medium text-foreground'}>
                                {setting.title}
                            </h4>
                            <p className={'mt-1 text-sm text-muted-foreground'}>
                                {setting.description}
                            </p>
                        </TileButton>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
