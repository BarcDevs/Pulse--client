import { LegalListBlock } from '@/types/legal'

type LegalBlockListProps = {
    block: LegalListBlock
}

export const LegalBlockList = ({ block }: LegalBlockListProps) => {
    return (
        <ul className={'mb-4 list-none p-0'}>
            {block.list.map((item) => (
                <li
                    key={item.text}
                    className={'flex gap-3 py-1.5 text-sm leading-relaxed text-on-surface'}
                >
                    <span className={'mt-2 size-1.25 shrink-0 rounded-full bg-primary'}/>
                    <span>
                        {item.label && (
                            <strong className={'text-on-surface'}>
                                {`${item.label} — `}
                            </strong>
                        )}
                        {item.text}
                    </span>
                </li>
            ))}
        </ul>
    )
}
