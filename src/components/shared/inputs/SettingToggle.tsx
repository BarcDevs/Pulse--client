import { ControlSwitch } from './ControlSwitch'

type SettingToggleProps = {
    label: string
    description?: string
    checked: boolean
    disabled?: boolean
    onChangeAction: (checked: boolean) => void
}

export const SettingToggle = ({
    label,
    description,
    checked,
    disabled,
    onChangeAction
}: SettingToggleProps) => (
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
        <ControlSwitch
            checked={checked}
            disabled={disabled}
            onCheckedChange={onChangeAction}
        />
    </div>
)
