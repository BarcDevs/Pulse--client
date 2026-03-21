import { LucideIcon } from 'lucide-react'

type GuidelineItemProps = {
    icon: LucideIcon
    label: string
}

export const GuidelineItem = ({
    icon: Icon,
    label,
}: GuidelineItemProps) => {
    return (
        <div className={'flex items-center gap-2 text-sm text-muted-foreground'}>
            <Icon className={'h-4 w-4 text-secondary'} />
            {label}
        </div>
    )
}
