import { ViewTransition } from 'react'

import { LayoutProps } from '@/types/react'

const DashboardTemplate = ({
    children
}: LayoutProps) => (
    <ViewTransition>
        {children}
    </ViewTransition>
)

export default DashboardTemplate
