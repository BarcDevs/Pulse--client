import { useTranslations } from 'next-intl'

import { checkInFormSchema } from '@/config/schema/checkInForm'

import { startLocales } from '@/locales/startLocales'

type GuestPointChartProps = {
    name: string
    value: number
    color: string
}

const { min, max } = checkInFormSchema.moodScore
const GRID_LINES = [max, 5, min]

const getTop = (score: number) => `${(max - score) / (max - min) * 100}%`

export const GuestPointChart = ({
    name,
    value,
    color
}: GuestPointChartProps) => {
    const t = useTranslations()
    const top = getTop(value)

    return (
        <section className={'min-w-0 rounded-2xl bg-card px-4.5 pt-4 pb-3 shadow-sm'}>
            <div className={'flex items-center gap-2 text-[15px] font-semibold text-foreground'}>
                <i
                    className={'size-2.5 rounded-full'}
                    style={{
                        background: color
                    }}
                />
                {name}
            </div>
            <div className={'relative my-6.5 mb-3 h-30 md:h-37.5'}>
                {GRID_LINES.map((line) => (
                    <div
                        key={line}
                        className={'absolute inset-x-0 border-t border-border'}
                        style={{
                            top: getTop(line)
                        }}
                    >
                        <span className={'absolute -top-2.25 start-0 text-[11px] text-muted-foreground'}>
                            {line}
                        </span>
                    </div>
                ))}
                <div className={'absolute inset-y-0 start-6.5 end-0'}>
                    <div
                        className={'absolute inset-x-16.5 end-0 h-0 border-t-2 border-dashed [mask-image:linear-gradient(to_right,#000,transparent)] rtl:[mask-image:linear-gradient(to_left,#000,transparent)]'}
                        style={{
                            top,
                            borderColor: `color-mix(in srgb, ${color} 45%, transparent)`
                        }}
                    />
                    <div
                        className={'absolute start-0 flex -translate-y-1/2 items-center gap-5.5'}
                        style={{
                            top
                        }}
                    >
                        <i
                            className={'relative size-4 shrink-0 rounded-full'}
                            style={{
                                background: color,
                                boxShadow: `0 0 0 3px var(--card), 0 0 0 11px color-mix(in srgb, ${color} 20%, transparent), 0 0 0 21px color-mix(in srgb, ${color} 8%, transparent)`
                            }}
                        />
                        <b className={'ms-1.5 text-[22px] font-bold text-foreground'}>
                            {value}
                        </b>
                    </div>
                </div>
            </div>
            <div className={'flex justify-between text-xs text-muted-foreground'}>
                <span className={'font-semibold text-foreground'}>
                    {t(startLocales.result.today)}
                </span>
                <span>{t(startLocales.result.firstPoint)}</span>
            </div>
        </section>
    )
}
