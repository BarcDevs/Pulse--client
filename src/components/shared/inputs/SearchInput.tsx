import { ComponentProps } from 'react'

import { Search } from 'lucide-react'

import { ClassName } from '@/types/react'

import { Input } from '@/components/shared/inputs/Input'

import { cn } from '@/lib/utils'

type SearchInputVariant = 'card' | 'header' | 'pill'

type SearchInputProps = Omit<
    ComponentProps<typeof Input>,
    | 'variant'
    | 'size'
    | 'className'
> & {
    variant?: SearchInputVariant
    className?: ClassName
}

type SearchInputStyle = {
    inputVariant: ComponentProps<typeof Input>['variant']
    icon: string
    input: string
}

const variantStyles: Record<SearchInputVariant, SearchInputStyle> = {
    card: {
        inputVariant: 'card',
        icon: 'size-4 start-3',
        input: 'ps-9'
    },
    header: {
        inputVariant: 'card',
        icon: 'size-4 start-3',
        input: 'h-10 rounded-lg pe-4 ps-10 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20'
    },
    pill: {
        inputVariant: 'search',
        icon: 'size-[18px] start-4',
        input: 'ps-11'
    }
}

export const SearchInput = ({
    variant = 'card',
    className,
    ...props
}: SearchInputProps) => (
    <div className={cn('relative', className)}>
        <Search className={cn(
            'absolute top-1/2 -translate-y-1/2 text-muted-foreground',
            variantStyles[variant].icon
        )}/>
        <Input
            variant={variantStyles[variant].inputVariant}
            className={variantStyles[variant].input}
            {...props}
        />
    </div>
)
