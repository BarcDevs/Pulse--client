import {PenLine} from 'lucide-react'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {Textarea} from '@/components/ui/textarea'

import {
    CHECKIN_JOURNAL_PLACEHOLDER,
    CHECKIN_JOURNAL_TITLE
} from '@/constants/checkInTexts'

// todo: fix ts warnings
type CheckInJournalProps = {
    value: string
    onChange: (value: string) => void
}

export const CheckInJournal = ({
    value,
    onChange
}: CheckInJournalProps) => (
    <Card className={'mt-6 border-0 shadow-sm'}>
        <CardHeader className={'pb-3'}>
            <div className={'flex items-center gap-2'}>
                <PenLine className={'size-5 text-primary'}/>
                <CardTitle className={'text-lg font-semibold'}>
                    {CHECKIN_JOURNAL_TITLE}
                </CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <Textarea
                placeholder={CHECKIN_JOURNAL_PLACEHOLDER}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={'min-h-30 resize-none border-border bg-surface-card placeholder:text-muted-foreground'}
            />
        </CardContent>
    </Card>
)
