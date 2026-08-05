import { LegalBlock } from '@/types/legal'

import { LegalBlockCallout } from './LegalBlockCallout'
import { LegalBlockList } from './LegalBlockList'
import { LegalBlockTable } from './LegalBlockTable'

type LegalSectionBodyProps = {
    blocks: LegalBlock[]
}

export const LegalSectionBody = ({ blocks }: LegalSectionBodyProps) => {
    return (
        <>
            {blocks.map((block) => {
                if (typeof block === 'string') {
                    return (
                        <p
                            key={block}
                            className={'mb-3.5 text-[14.5px] leading-relaxed text-on-surface'}
                        >
                            {block}
                        </p>
                    )
                }

                if ('list' in block) {
                    return (
                        <LegalBlockList
                            key={block.list.map((item) => item.text).join('-')}
                            block={block}
                        />
                    )
                }

                if ('callout' in block) {
                    return (
                        <LegalBlockCallout
                            key={block.callout}
                            block={block}
                        />
                    )
                }

                return (
                    <LegalBlockTable
                        key={block.table.map((row) => row.join('-')).join('|')}
                        block={block}
                    />
                )
            })}
        </>
    )
}
