import { ClipboardPlus, Pencil } from 'lucide-react'

type GoalFormHeaderProps = {
    mode: 'create' | 'edit'
    title: string
    subtitle: string
}

export const GoalFormHeader = ({
    mode,
    title,
    subtitle
}: GoalFormHeaderProps) => {
    const IconComponent = mode === 'create'
        ? ClipboardPlus
        : Pencil

    return (
        <div
            className={'h-32 flex items-center px-8 relative'}
            style={{ background: 'linear-gradient(to right, var(--primary-gradient-start), var(--primary-gradient-end))' }}
        >
            <div className={'flex items-center gap-6 w-full'}>
                <div className={'w-16 h-16 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-primary-foreground shadow-sm flex-shrink-0'}>
                    <IconComponent className={'w-8 h-8'}/>
                </div>
                <div className={'flex flex-col gap-1'}>
                    <h2 className={'text-2xl font-extrabold tracking-tight text-white'}>
                        {title}
                    </h2>
                    <p className={'text-white/80 text-sm'}>
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    )
}
