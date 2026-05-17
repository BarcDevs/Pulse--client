'use client'

import { useTranslations } from 'next-intl'

import { toast } from 'sonner'

import { useMutation } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot
} from '@/components/ui/input-otp'

import { useConfirmEmailChangeForm } from '@/hooks/forms/useConfirmEmailChangeForm'

import { useAuth } from '@/context/AuthContext'

import { confirmEmailChange } from '@/api/auth'
import { settingsLocales } from '@/locales/settingsLocales'

type Props = {
    onSuccessAction: () => void
    onCancelAction: () => void
}

export const OtpConfirmStep = ({
    onSuccessAction,
    onCancelAction
}: Props) => {
    const t = useTranslations()
    const { user, setUser } = useAuth()
    const {
        mutateAsync: confirmChange,
        isPending
    } = useMutation({
        mutationFn: confirmEmailChange
    })
    const { form, handleSubmit } = useConfirmEmailChangeForm({
        onSubmit: async (data) => {
            const { user: confirmed } =
                await confirmChange({
                    OTP: Number(data.otp)
                })
            setUser({
                ...user!,
                ...confirmed
            })
            toast.success(t(settingsLocales.security.email.successToast))
            onSuccessAction()
        }
    })

    return (
        <Form {...form}>
            <form
                className={'mt-3 space-y-3 rounded-xl bg-surface-section p-4'}
                onSubmit={handleSubmit}
            >
                <div>
                    <p className={'text-sm font-medium'}>
                        {t(settingsLocales.security.email.otpTitle)}
                    </p>
                    <p className={'text-sm text-muted-foreground'}>
                        {t(settingsLocales.security.email.otpDescription)}
                    </p>
                </div>
                <FormField
                    name={'otp'}
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <InputOTP
                                    maxLength={6}
                                    {...field}
                                >
                                    <InputOTPGroup>
                                        {Array.from({ length: 6 }, (_, i) => (
                                            <InputOTPSlot
                                                key={i} index={i}
                                                className={'bg-surface-card'}
                                            />
                                        ))}
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                {form.formState.errors.root && (
                    <p className={'text-sm text-destructive'}>
                        {form.formState.errors.root.message}
                    </p>
                )}
                <div className={'flex gap-2 pt-1'}>
                    <Button
                        type={'submit'}
                        size={'sm'}
                        disabled={isPending || form.watch('otp').length < 6}
                    >
                        {isPending
                            ? t(settingsLocales.security.email.verifyingButton)
                            : t(settingsLocales.security.email.verifyButton)
                        }
                    </Button>
                    <Button
                        type={'button'}
                        size={'sm'}
                        variant={'outline'}
                        onClick={onCancelAction}
                        disabled={isPending}
                    >
                        {t(settingsLocales.security.email.cancelButton)}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
