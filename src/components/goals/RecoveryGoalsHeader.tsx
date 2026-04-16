type RecoveryGoalsHeaderProps = {
    title: string
    description: string
}

export const RecoveryGoalsHeader = ({
    title,
    description
}: RecoveryGoalsHeaderProps) => (
    <section className={'mb-12'}>
        <h3 className={'text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-4'}>
            {title}
        </h3>
        <p className={'text-on-surface-variant text-lg max-w-2xl leading-relaxed'}>
            {description}
        </p>
    </section>
)
