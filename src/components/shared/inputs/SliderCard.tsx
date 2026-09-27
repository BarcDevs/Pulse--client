import { LucideIcon } from 'lucide-react'

import { Card } from '@/components/shared/cards/Card'
import { Slider } from '@/components/shared/inputs/Slider'
import { CardContent } from '@/components/ui/card'

import { checkInFormSchema } from '@/config/schema/checkInForm'

type SliderCardProps = {
    icon: LucideIcon
    label: string
    minLabel: string
    maxLabel: string
    value: number
    onChange: (value: number) => void
    color: string
    tintColor: string
}

export const SliderCard = ({
    icon: Icon,
    label,
    minLabel,
    maxLabel,
    value,
    onChange,
    color,
    tintColor
}: SliderCardProps) => (
    <Card>
        <CardContent className={'pt-6'}>
            <div className={'mb-4 flex items-center justify-between'}>
                <div className={'flex items-center gap-3'}>
                    <div
                        className={'flex size-10 items-center justify-center rounded-full'}
                        style={{
                            backgroundColor: `color-mix(in srgb, ${tintColor}, white 40%)`
                        }}
                    >
                        <Icon
                            className={'size-5'}
                            style={{
                                color
                            }}
                        />
                    </div>
                    <span className={'font-medium text-foreground'}>
                        {label}
                    </span>
                </div>
                <span
                    className={'text-sm font-semibold'}
                    style={{
                        color
                    }}
                >
                    {value}
                </span>
            </div>
            <Slider
                value={[value]}
                onValueChange={(values) => onChange(values[0])}
                min={checkInFormSchema.moodScore.min}
                max={checkInFormSchema.moodScore.max}
                step={1}
                color={color}
            />
            <div className={'mt-3 flex justify-between text-xs text-muted-foreground'}>
                <span>{minLabel}</span>
                <span>{maxLabel}</span>
            </div>
        </CardContent>
    </Card>
)
