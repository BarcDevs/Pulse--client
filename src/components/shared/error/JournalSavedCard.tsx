import {Icon} from '@/components/shared/ui/Icon'

import {ERROR_PAGE} from '@/constants/errorMessages'

export const JournalSavedCard = () => (
    <div className={'p-6 bg-surface-container-low rounded-xl border border-outline-variant/5'}>
        <div className={'mb-3'}>
            <Icon
                name={'error/clinical-notes'}
                size={24}
            />
        </div>
        <h4 className={'font-bold text-primary mb-1'}>
            {ERROR_PAGE.journalSavedTitle}
        </h4>
        <p className={'text-xs text-on-surface-variant'}>
            {ERROR_PAGE.journalSavedDesc}
        </p>
    </div>
)
