import Link from 'next/link'

import {NOT_FOUND_PAGE} from '@/constants/errorMessages'

export const NotFoundResources = () => (
    <div className={'mt-16 grid grid-cols-2 gap-6 opacity-60'}>
        <div className={'flex flex-col gap-1'}>
            <span className={'text-[10px] uppercase font-bold tracking-widest text-outline'}>
                {NOT_FOUND_PAGE.resourceCenterLabel}
            </span>
            <Link
                href={'/check-in'}
                className={'text-sm font-semibold hover:text-primary transition-colors'}
            >
                {NOT_FOUND_PAGE.dailyJournalLink}
            </Link>
        </div>
        <div className={'flex flex-col gap-1'}>
            <span className={'text-[10px] uppercase font-bold tracking-widest text-outline'}>
                {NOT_FOUND_PAGE.supportHubLabel}
            </span>
            <Link
                href={'/community'}
                className={'text-sm font-semibold hover:text-primary transition-colors'}
            >
                {NOT_FOUND_PAGE.groupMeetingsLink}
            </Link>
        </div>
    </div>
)
