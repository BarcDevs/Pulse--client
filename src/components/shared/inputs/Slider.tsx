import { ComponentProps } from 'react'

import { Slider as UiSlider } from '@/components/ui/slider'

import { cn } from '@/lib/utils'

type SliderProps = ComponentProps<typeof UiSlider>

const designStyles = '[&_[data-slot=slider-track]]:h-1! [&_[data-slot=slider-thumb]]:size-4.5! [&_[data-slot=slider-thumb]]:border-[2.5px]! [&_[data-slot=slider-thumb]]:border-white! [&_[data-slot=slider-thumb]]:bg-(--slider-color) [&_[data-slot=slider-thumb]]:shadow-slider-thumb'

export const Slider = ({
    className,
    ...props
}: SliderProps) => (
    <UiSlider
        className={cn(designStyles, className)}
        {...props}
    />
)
