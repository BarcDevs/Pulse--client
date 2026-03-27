import {Icon} from '@/components/shared/ui/Icon'

import {errorPageTexts} from '@/constants/componentTexts/ui/errors'

export const SystemHealthCard = () => (
    <div className={'p-6 bg-surface-container-low rounded-xl border border-outline-variant/5'}>
        <div className={'mb-3'}>
            <Icon
                name={'error/cloud-done'}
                size={24}
            />
        </div>
        <h4 className={'font-bold text-primary mb-1'}>
            {errorPageTexts.systemHealthTitle}
        </h4>
        <p className={'text-xs text-on-surface-variant'}>
            {errorPageTexts.systemHealthDesc}
        </p>
    </div>
)
