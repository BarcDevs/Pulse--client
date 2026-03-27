import Link from 'next/link'

import {notFoundPageTexts} from '@/constants/componentTexts/ui/errors'

export const NotFoundResources = () => (
    <div className={'mt-16 grid grid-cols-2 gap-6 opacity-60'}>
        <div className={'flex flex-col gap-1'}>
            <span className={'text-[10px] uppercase font-bold tracking-widest text-outline'}>
                {notFoundPageTexts.resourceCenterLabel}
            </span>
            <Link
                href={'/check-in'}
                className={'text-sm font-semibold hover:text-primary transition-colors'}
            >
                {notFoundPageTexts.dailyJournalLink}
            </Link>
        </div>
        <div className={'flex flex-col gap-1'}>
            <span className={'text-[10px] uppercase font-bold tracking-widest text-outline'}>
                {notFoundPageTexts.supportHubLabel}
            </span>
            <Link
                href={'/community'}
                className={'text-sm font-semibold hover:text-primary transition-colors'}
            >
                {notFoundPageTexts.groupMeetingsLink}
            </Link>
        </div>
    </div>
)
