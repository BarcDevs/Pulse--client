import { LegalTableBlock } from '@/types/legal'

import { cn } from '@/lib/utils'

type LegalBlockTableProps = {
    block: LegalTableBlock
}

export const LegalBlockTable = ({
    block
}: LegalBlockTableProps) => {
    return (
        <div className={'mb-4 mt-2 overflow-hidden rounded-xl border border-border'}>
            {block.table.map((row, rowIndex) => (
                <div
                    key={row.join('-')}
                    className={cn(
                        'grid grid-cols-[1fr_1.4fr_0.8fr] items-center gap-3 px-3.5 py-3 text-sm',
                        rowIndex === 0
                            ? 'bg-muted font-bold uppercase tracking-wide text-muted-foreground'
                            : 'border-t border-border bg-card text-on-surface',
                        rowIndex !== 0 && 'font-normal normal-case'
                    )}
                >
                    <div>{row[0]}</div>
                    <div>{row[1]}</div>
                    <div>{row[2]}</div>
                </div>
            ))}
        </div>
    )
}
