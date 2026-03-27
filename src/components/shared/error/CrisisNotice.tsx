import {errorPageTexts} from '@/constants/componentTexts/ui/errors'

export const CrisisNotice = () => (
    <div className={'mt-10 text-slate-400 text-xs'}>
        <p>
            {`${errorPageTexts.crisisNoticeStart} `}
            <span className={'text-primary dark:text-primary/80 font-semibold underline underline-offset-2 decoration-primary/30'}>
                {errorPageTexts.hotlineNumber}
            </span>
        </p>
    </div>
)
