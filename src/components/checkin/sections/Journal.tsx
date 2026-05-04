import { useTranslations } from 'next-intl'

import { PenLine } from 'lucide-react'
import type { ChangeEvent } from 'react'

import type { FormControlProps } from '@/types/forms'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

import { checkInLocales } from '@/locales/checkInLocales'
import type { CheckInSchema } from '@/validations/forms/checkInSchema'

type CheckInJournalProps = FormControlProps<CheckInSchema>

export const CheckInJournal = ({
    watch,
    setValueAction
}: CheckInJournalProps) => {
    const t = useTranslations()
    const notes = watch('notes') ?? ''

    const handleNotesChange = (e: ChangeEvent<HTMLTextAreaElement>) => setValueAction('notes', e.target.value)

    return (
        <Card className={'mt-6 border-0 shadow-sm'}>
            <CardHeader className={'pb-3'}>
                <div className={'flex items-center gap-2'}>
                    <PenLine className={'size-5 text-primary'}/>
                    <CardTitle className={'text-lg font-semibold'}>
                        {t(checkInLocales.journal.title)}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <Textarea
                    placeholder={t(checkInLocales.journal.placeholder)}
                    value={notes}
                    onChange={handleNotesChange}
                    className={'min-h-30 resize-none border-border bg-surface-card placeholder:text-muted-foreground'}
                />
            </CardContent>
        </Card>
    )
}
