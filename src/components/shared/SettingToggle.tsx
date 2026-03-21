type SettingToggleProps = {
    label: string
    description?: string
    checked: boolean
    onChange: (checked: boolean) => void
}

export const SettingToggle = ({
    label,
    description,
    checked,
    onChange,
}: SettingToggleProps) => {
    return (
        <div className={'flex items-center justify-between'}>
            <div>
                <h4 className={'font-medium text-foreground'}>
                    {label}
                </h4>
                {description && (
                    <p className={'text-sm text-muted-foreground'}>
                        {description}
                    </p>
                )}
            </div>
            <button
                onClick={() => onChange(!checked)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                    checked ? 'bg-primary' : 'bg-muted'
                }`}
            >
                <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                        checked ? 'left-6' : 'left-1'
                    }`}
                />
            </button>
        </div>
    )
}
