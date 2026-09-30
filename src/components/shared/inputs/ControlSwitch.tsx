import type { ComponentProps } from 'react'

import { Switch } from '@/components/ui/switch'

export const ControlSwitch = (
    props: ComponentProps<typeof Switch>
) => (
    // shadcn's Switch mirrors its thumb position under RTL, making the "on"
    // state look wrong in Hebrew - force LTR so it always renders correctly
    <div dir={'ltr'}>
        <Switch
            {...props}
            className={'scale-x-150 scale-y-150 transition-opacity hover:opacity-80'}
        />
    </div>
)
