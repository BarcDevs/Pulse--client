type RecoveryGoalsHeaderProps = {
    description: string
}

export const RecoveryGoalsHeader = ({
    description
}: RecoveryGoalsHeaderProps) => (
    <section className={'mb-12'}>
        <p className={'text-on-surface-variant text-lg max-w-2xl leading-relaxed'}>
            {description}
        </p>
    </section>
)
