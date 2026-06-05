'use client'

import { useTranslations } from 'next-intl'

import {
    Check,
    Eye,
    Pencil,
    X
} from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useProfileEditContext } from '@/context/ProfileEditContext'

import { profileLocales } from '@/locales/profileLocales'

export const EditBanner = () => {
    const t = useTranslations()
    const {
        isEditing,
        startEdit,
        cancelEdit,
        handleSave,
        isSaving,
        hasErrors
    } = useProfileEditContext()

    return (
        <div className={`flex items-center justify-between gap-3 rounded-xl border px-5 py-4 shadow-sm ${isEditing ? 'border-primary/40 bg-primary/5' : 'border-border bg-surface-card'}`}>
            <div className={'flex items-center gap-3'}>
                <div className={`flex size-8 items-center justify-center rounded-lg ${isEditing ? 'bg-primary' : 'bg-muted'}`}>
                    {isEditing
                        ? <Pencil className={'size-4 text-white'}/>
                        : <Eye className={'size-4 text-muted-foreground'}/>
                    }
                </div>
                <div>
                    <p className={'text-sm font-semibold text-foreground'}>
                        {isEditing
                            ? t(profileLocales.editBanner.editing)
                            : t(profileLocales.editBanner.viewing)
                        }
                    </p>
                    <p className={'text-xs text-muted-foreground'}>
                        {isEditing
                            ? t(profileLocales.editBanner.editingSubtitle)
                            : t(profileLocales.editBanner.viewingSubtitle)
                        }
                    </p>
                </div>
            </div>

            <div className={'flex gap-2'}>
                {isEditing ? (
                    <>
                        <Button
                            variant={'outline'}
                            size={'sm'}
                            onClick={cancelEdit}
                            disabled={isSaving}
                        >
                            <X className={'size-3.5'}/>
                            {t(profileLocales.editBanner.cancel)}
                        </Button>
                        <Button
                            size={'sm'}
                            onClick={handleSave}
                            disabled={isSaving || hasErrors}
                        >
                            <Check className={'size-3.5'}/>
                            {t(profileLocales.editBanner.save)}
                        </Button>
                    </>
                ) : (
                    <Button
                        variant={'outline'}
                        size={'sm'}
                        className={'gap-1.5 border-primary text-primary hover:bg-primary/5 hover:text-primary'}
                        onClick={startEdit}
                    >
                        <Pencil className={'size-3.5'}/>
                        {t(profileLocales.editBanner.edit)}
                    </Button>
                )}
            </div>
        </div>
    )
}
