'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Lock } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useChangePassword } from '@/hooks/mutations/useChangePassword'

import { toRelative } from '@/lib/time'

import { useAuth } from '@/context/AuthContext'

import { settingsLocales } from '@/locales/settingsLocales'

import { SecuritySettingItem } from '../items/SecuritySettingItem'

export const PasswordSection = () => {
    const t = useTranslations()
    const { user } = useAuth()
    const passwordValue = user?.passwordUpdatedAt
        ? `Last changed ${toRelative(new Date(user.passwordUpdatedAt))}`
        : ''
    const [expanded, setExpanded] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const {
        mutate: changePassword,
        isPending
    } = useChangePassword()

    const handleSave = () => {
        if (newPassword !== confirmPassword) {
            setError(t(settingsLocales.security.password.passwordMismatch))
            return
        }
        setError('')
        changePassword(
            { currentPassword, newPassword },
            {
                onSuccess: () => {
                    setExpanded(false)
                    setCurrentPassword('')
                    setNewPassword('')
                    setConfirmPassword('')
                }
            }
        )
    }

    const handleCancel = () => {
        setExpanded(false)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setError('')
    }

    return (
        <div>
            <SecuritySettingItem
                icon={<Lock className={'h-5 w-5 text-muted-foreground'}/>}
                label={t(settingsLocales.security.password.label)}
                value={passwordValue}
                onClickAction={() => setExpanded((prev) => !prev)}
            />

            {expanded && (
                <div className={'mt-3 space-y-3 rounded-xl bg-surface-section p-4'}>
                    <div className={'space-y-1.5'}>
                        <Label htmlFor={'current-pw'}>
                            {t(settingsLocales.security.password.currentPassword)}
                        </Label>
                        <Input
                            id={'current-pw'}
                            type={'password'}
                                className={'bg-surface-card'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <div className={'space-y-1.5'}>
                        <Label htmlFor={'new-pw'}>
                            {t(settingsLocales.security.password.newPassword)}
                        </Label>
                        <Input
                            id={'new-pw'}
                            type={'password'}
                                className={'bg-surface-card'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className={'space-y-1.5'}>
                        <Label htmlFor={'confirm-pw'}>
                            {t(settingsLocales.security.password.confirmPassword)}
                        </Label>
                        <Input
                            id={'confirm-pw'}
                            type={'password'}
                                className={'bg-surface-card'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {error && (
                        <p className={'text-sm text-destructive'}>
                            {error}
                        </p>
                    )}
                    <div className={'flex gap-2 pt-1'}>
                        <Button
                            size={'sm'}
                            onClick={handleSave}
                            disabled={
                            isPending
                                || !currentPassword
                                || !newPassword
                                || !confirmPassword
                        }
                        >
                            {isPending
                                ? t(settingsLocales.security.password.changingButton)
                                : t(settingsLocales.security.password.changeButton)
                            }
                        </Button>
                        <Button
                            size={'sm'}
                            variant={'outline'}
                            onClick={handleCancel}
                            disabled={isPending}
                        >
                            {t(settingsLocales.security.password.cancelButton)}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
