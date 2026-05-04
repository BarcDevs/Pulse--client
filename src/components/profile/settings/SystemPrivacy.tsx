import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

import { profileSystemPrivacySettingsWithIcons } from '@/constants/mappings/profile'

import { profileLocales } from '@/locales/profileLocales'

export const SystemPrivacy = () => {
    const t = useTranslations()

    return (
        <div className={'card-base'}>
            <h3 className={'text-lg font-semibold text-foreground mb-6'}>
                {t(profileLocales.systemPrivacy.title)}
            </h3>

            <div className={'grid grid-cols-2 lg:grid-cols-4 gap-4'}>
                {profileSystemPrivacySettingsWithIcons.map((setting) => (
                    <Button
                        key={setting.title}
                        variant={'ghost'}
                        className={'flex flex-col items-center p-4 rounded-xl bg-surface-section hover:bg-surface-section/80 h-auto text-center'}
                    >
                        <div className={'h-12 w-12 rounded-xl bg-surface-card flex--center mb-3'}>
                            <setting.icon className={'h-6 w-6 text-muted-foreground'}/>
                        </div>
                        <h4 className={'text-sm font-medium text-foreground'}>
                            {setting.title}
                        </h4>
                        <p className={'text-xs text-muted-foreground mt-1'}>
                            {setting.subtitle}
                        </p>
                    </Button>
                ))}
            </div>
        </div>
    )
}
