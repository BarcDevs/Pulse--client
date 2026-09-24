'use client'

import { useTranslations } from 'next-intl'

import { Shield } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { useSupportForm } from '@/hooks/forms/useSupportForm'

import { cn } from '@/lib/utils'

import { SUPPORT_EMAIL_PLACEHOLDER } from '@/constants/support'

import { supportLocales } from '@/locales/supportLocales'
import { SupportSchema } from '@/validations/forms/supportSchema'

import { TopicChips } from './TopicChips'

const labelClass = 'mb-2 block text-[11px] font-bold uppercase tracking-[0.07em] text-muted-foreground'

type SupportContactFormProps = {
    requireEmail: boolean
    onSubmit: (data: SupportSchema) => Promise<void>
}

export const SupportContactForm = ({
    requireEmail,
    onSubmit
}: SupportContactFormProps) => {
    const t = useTranslations()
    const { form, handleSubmit } = useSupportForm({
        requireEmail,
        onSubmit
    })
    const { isSubmitting, errors } = form.formState
    const canSend = form.watch('message').trim().length > 0

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit}
                className={'flex flex-col gap-3.5'}
            >
                <FormField
                    control={form.control}
                    name={'topic'}
                    render={({ field }) => (
                        <FormItem>
                            <Label className={labelClass}>
                                {t(supportLocales.contact.topicLabel)}
                            </Label>
                            <TopicChips
                                value={field.value}
                                onChange={field.onChange}
                            />
                        </FormItem>
                    )}
                />
                {requireEmail && (
                    <FormField
                        control={form.control}
                        name={'email'}
                        render={({ field }) => (
                            <FormItem>
                                <Label className={labelClass}>
                                    {t(supportLocales.contact.emailLabel)}
                                </Label>
                                <Input
                                    {...field}
                                    type={'email'}
                                    placeholder={SUPPORT_EMAIL_PLACEHOLDER}
                                    className={'h-auto rounded-[10px] border-[1.5px] border-border bg-surface-page p-3.5 text-sm focus-visible:border-primary focus-visible:ring-0'}
                                />
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                )}
                <FormField
                    control={form.control}
                    name={'message'}
                    render={({ field }) => (
                        <FormItem>
                            <Label className={labelClass}>
                                {t(supportLocales.contact.messageLabel)}
                            </Label>
                            <Textarea
                                {...field}
                                placeholder={t(supportLocales.contact.messagePlaceholder)}
                                className={'min-h-[130px] resize-y rounded-[10px] border-[1.5px] border-border bg-surface-page p-3.5 text-sm leading-[1.6] focus-visible:border-primary focus-visible:ring-0'}
                            />
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                {errors.root?.message && (
                    <p
                        role={'alert'}
                        className={'text-sm text-destructive'}
                    >
                        {errors.root.message}
                    </p>
                )}
                <div className={'flex items-center justify-between gap-3'}>
                    <p className={'inline-flex items-center gap-1.5 text-xs text-muted-foreground'}>
                        <Shield className={'size-3 text-secondary'}/>
                        {t(supportLocales.contact.privacyNote)}
                    </p>
                    <Button
                        type={'submit'}
                        disabled={!canSend || isSubmitting}
                        className={cn(
                            'h-auto rounded-[10px] px-[22px] py-[11px] text-[13px] font-bold leading-tight',
                            canSend
                                ? 'bg-linear-to-br from-primary-gradient-end to-primary-gradient-start text-primary-foreground shadow-lg shadow-primary/25'
                                : 'bg-muted text-muted-foreground shadow-none hover:bg-muted disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-100'
                        )}
                    >
                        {t(isSubmitting ? supportLocales.contact.sending : supportLocales.contact.send)}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
