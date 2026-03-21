import { Bell, History, Share2, Shield } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {
    PROFILE_SETTINGS_LIST,
    PROFILE_SETTINGS_TITLE,
} from '@/constants/profileTexts'

const iconMap = {
    'Security': Shield,
    'Notifications': Bell,
    'Data Sharing': Share2,
    'Login History': History,
}

const settings = PROFILE_SETTINGS_LIST.map((setting) => ({
    ...setting,
    icon: iconMap[setting.title as keyof typeof iconMap],
}))

export const ProfileSettings = () => {
    return (
        <Card className={'border-0 shadow-sm'}>
            <CardHeader>
                <CardTitle className={'text-lg font-semibold'}>
                    {PROFILE_SETTINGS_TITLE}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className={'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
                    {settings.map((setting) => (
                        <button
                            key={setting.title}
                            className={
                                'flex flex-col items-center rounded-xl bg-surface-section p-6 text-center transition-colors hover:bg-muted'
                            }
                        >
                            <div className={
                                'flex size-12 items-center justify-center rounded-xl bg-primary-light'
                            }>
                                <setting.icon className={'size-6 text-primary'} />
                            </div>
                            <h4 className={'mt-3 font-medium text-foreground'}>
                                {setting.title}
                            </h4>
                            <p className={'mt-1 text-sm text-muted-foreground'}>
                                {setting.description}
                            </p>
                        </button>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
