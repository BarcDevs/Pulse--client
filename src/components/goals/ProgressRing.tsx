import { ProgressRingSVGContent } from './ProgressRingSVGContent'

type ProgressRingProps = {
    percentage: number
}

export const ProgressRing = ({
    percentage
}: ProgressRingProps) => {
    const radius = 56
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (percentage / 100) * circumference

    return (
        <div className={'flex flex-col items-center justify-center px-8 md:border-l border-surface-container-high'}>
            <div className={'relative w-32 h-32 flex items-center justify-center'}>
                <ProgressRingSVGContent
                    circumference={circumference}
                    offset={offset}
                    radius={radius}
                />
                <div className={'absolute inset-0 flex flex-col items-center justify-center'}>
                    <span className={'text-2xl font-bold font-headline'}>
                        {Math.round(percentage)}%
                    </span>
                </div>
            </div>
            <span className={'text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-4'}>
                Completion
            </span>
        </div>
    )
}
