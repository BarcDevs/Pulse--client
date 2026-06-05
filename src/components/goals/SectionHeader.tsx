type SectionHeaderProps = {
    title: string
    subtitle: string
    titleClassName?: string
    subtitleClassName?: string
}

export const SectionHeader = ({
    title,
    subtitle,
    titleClassName = 'text-xl font-bold text-white',
    subtitleClassName = 'text-sm text-white/60 mt-1'
}: SectionHeaderProps) => (
    <div>
        <h2 className={titleClassName}>
            {title}
        </h2>

        <p className={subtitleClassName}>
            {subtitle}
        </p>
    </div>
)
