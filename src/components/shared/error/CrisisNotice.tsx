import {ERROR_PAGE} from '@/constants/errorMessages'

export const CrisisNotice = () => (
    <div className={'mt-10 text-slate-400 text-xs'}>
        <p>
            {`${ERROR_PAGE.crisisNoticeStart} `}
            <span className={'text-primary dark:text-primary/80 font-semibold underline underline-offset-2 decoration-primary/30'}>
                {ERROR_PAGE.hotlineNumber}
            </span>
        </p>
    </div>
)
