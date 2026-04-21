import { recoveryGoalsPageTexts } from '@/constants/componentTexts/recoveryGoals'

type RecoveryGoalsHeaderProps = {
    description: string
}

export const RecoveryGoalsHeader = ({
    description
}: RecoveryGoalsHeaderProps) => (
    <section className={'mb-12'}>
        <h1 className={'text-4xl md:text-5xl font-extrabold text-on-surface tracking-tighter mb-4'}>
            {recoveryGoalsPageTexts.header.title}
        </h1>
        <p className={'text-on-surface-variant text-lg max-w-2xl leading-relaxed'}>
            {description}
        </p>
    </section>
)
