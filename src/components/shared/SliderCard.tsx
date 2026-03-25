import
{LucideIcon} from 'lucide-react'

import {
    Card,
    CardContent
} from '@/components/ui/card'
import {Slider} from '@/components/ui/slider'

type SliderCardProps = {
    icon: LucideIcon
    label: string
    minLabel: string
    maxLabel: string
    value: number
    onChange: (value: number) => void
    colorVar?: string
}

export const SliderCard = ({
    icon: Icon,
    label,
    minLabel,
    maxLabel,
    value,
    onChange,
    colorVar = 'primary'
}: SliderCardProps) => (
    <Card className={'border-0 shadow-sm'}>
        <CardContent className={'pt-6'}>
            <div className={'mb-4 flex items-center gap-3'}>
                <div
                    className={'flex size-10 items-center justify-center rounded-full'}
                    style={{
                        backgroundColor: `var(--${colorVar}-light)`
                    }}
                >
                    <Icon
                        className={'size-5'}
                        style={{
                            color: `var(--${colorVar})`
                        }}
                    />
                </div>
                <span className={'font-medium text-foreground'}>
                        {label}
                    </span>
            </div>
            <Slider
                value={[value]}
                onValueChange={(values) => onChange(values[0])}
                max={100}
                step={1}
                className={'w-full'}
            />
            <div className={'mt-3 flex justify-between text-xs text-muted-foreground'}>
                <span>{minLabel}</span>
                <span>{maxLabel}</span>
            </div>
        </CardContent>
    </Card>
)