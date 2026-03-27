import {ClassName} from '@/types/react'

import {Icon} from '@/components/shared/ui/Icon'

import {cn} from '@/lib/utils'

type MetricProps = {
    image: string
    value: string | number
    title: string
    textStyles?: ClassName
}

export const Metric = ({
    image,
    title,
    value,
    textStyles
}: MetricProps) => (
    <div className={'flex-center flex-row flex-wrap gap-1'}>
        <Icon
            name={image}
            size={16}
        />
        <p
            className={cn(
                'flex items-center gap-1',
                textStyles
            )}
        >
            {value}
            <span className={'line-clamp-1'}>
                {title}
            </span>
        </p>
    </div>
)
