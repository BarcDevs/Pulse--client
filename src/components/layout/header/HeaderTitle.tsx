type HeaderTitleProps = {
    title: string
    subtitle?: string
}

export const HeaderTitle = ({
    title,
    subtitle
}: HeaderTitleProps) => (
    <div className={'flex items-center gap-4'}>
        <div>
            <h1 className={'text-lg font-semibold text-foreground'}>
                {title}
            </h1>
            {subtitle && (
                <p className={'text-sm text-muted-foreground'}>
                    {subtitle}
                </p>
            )}
        </div>
    </div>
)
