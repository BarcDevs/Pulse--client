import { useTranslations } from 'next-intl'

import { Eye, Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { profileLocales } from '@/locales/profileLocales'

export const EditBanner = () => {
    const t = useTranslations()

    return (
        <div className={'flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-card px-5 py-4 shadow-sm'}>
            <div className={'flex items-center gap-3'}>
                <div className={'flex size-8 items-center justify-center rounded-lg bg-muted'}>
                    <Eye className={'size-4 text-muted-foreground'}/>
                </div>
                <div>
                    <p className={'text-sm font-semibold text-foreground'}>
                        {t(profileLocales.editBanner.viewing)}
                    </p>
                    <p className={'text-xs text-muted-foreground'}>
                        {t(profileLocales.editBanner.viewingSubtitle)}
                    </p>
                </div>
            </div>

            {/* TODO: wire to global isEditing state */}
            <Button
                variant={'outline'}
                size={'sm'}
                className={'gap-1.5 border-primary text-primary hover:bg-primary/5 hover:text-primary'}
            >
                <Pencil className={'size-3.5'}/>
                {t(profileLocales.editBanner.edit)}
            </Button>
        </div>
    )
}
