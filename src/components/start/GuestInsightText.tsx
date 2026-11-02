type GuestInsightTextProps = {
    title: string
    content: string
}

export const GuestInsightText = ({
    title,
    content
}: GuestInsightTextProps) => (
    <div className={'animate-in fade-in slide-in-from-bottom-1.5 duration-500'}>
        <h2 className={'mb-2.5 text-2xl font-bold leading-tight tracking-tight text-foreground'}>
            {title}
        </h2>
        <p className={'text-base leading-relaxed text-foreground'}>
            {content}
        </p>
    </div>
)
