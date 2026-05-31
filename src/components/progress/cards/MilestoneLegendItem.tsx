import { ClassName } from '@/types/react'

import { MilestoneDot } from './MilestoneDot'

type MilestoneLegendItemProps = {
    dotClass: ClassName
    label: string
}

export const MilestoneLegendItem = ({ dotClass, label }: MilestoneLegendItemProps) => (
    <div className={'flex items-center gap-1.5'}>
        <MilestoneDot className={dotClass}/>
        <span className={'text-xs text-muted-foreground'}>
            {label}
        </span>
    </div>
)
