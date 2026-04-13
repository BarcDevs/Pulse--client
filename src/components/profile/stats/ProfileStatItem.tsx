type ProfileStatItemProps = {
    value: string | number
    label: string
}

export const ProfileStatItem = ({
    value,
    label
}: ProfileStatItemProps) => (
    <div className={'text-center'}>
        <p className={'text-2xl font-bold text-foreground'}>
            {value}
        </p>
        <p className={'text-xs text-muted-foreground'}>
            {label}f
        </p>
    </div>
)
