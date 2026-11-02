import { Slider } from '@/components/shared/inputs/Slider'

import { checkInFormSchema } from '@/config/schema/checkInForm'

type GuestSliderProps = {
    label: string
    minLabel: string
    maxLabel: string
    value: number
    color: string
    disabled: boolean
    onChange: (value: number) => void
}

const { min, max } = checkInFormSchema.moodScore

export const GuestSlider = ({
    label,
    minLabel,
    maxLabel,
    value,
    color,
    disabled,
    onChange
}: GuestSliderProps) => (
    <div className={'space-y-1'}>
        <div className={'flex items-baseline justify-between'}>
            <span className={'text-base font-semibold text-foreground'}>
                {label}
            </span>
            <output className={'flex items-baseline gap-0.5 text-2xl font-bold text-foreground'}>
                {value}
                <small className={'text-sm font-normal text-muted-foreground'}>
                    {`/${max}`}
                </small>
            </output>
        </div>
        <Slider
            value={[value]}
            onValueChange={(values) => onChange(values[0])}
            min={min}
            max={max}
            step={1}
            color={color}
            disabled={disabled}
            aria-label={label}
            className={'py-3'}
        />
        <div className={'flex justify-between text-xs text-muted-foreground'}>
            <span>{minLabel}</span>
            <span>{maxLabel}</span>
        </div>
    </div>
)
