import type { ComponentProps } from 'react'

import { Switch } from '@/components/ui/switch'

export const ControlSwitch = (
    props: ComponentProps<typeof Switch>
) => (
    <Switch
        {...props}
        className={'scale-x-150 scale-y-150 transition-opacity hover:opacity-80'}
    />
)
