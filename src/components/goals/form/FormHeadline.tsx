type FormHeadlineProps = {
    title: string
    subtitle: string
}

export const FormHeadline = ({
    title,
    subtitle
}: FormHeadlineProps) => (
    <div>
        <h2 className={'text-3xl font-extrabold tracking-tight text-on-background'}>
            {title}
        </h2>
        <p className={'text-on-surface-variant mt-1'}>
            {subtitle}
        </p>
    </div>
)
