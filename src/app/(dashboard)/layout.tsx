import {LayoutProps} from '@/types'

import {Sidebar} from '@/components/sidebar/Sidebar'
import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar'

const DashboardLayout = ({children}: LayoutProps) => (
    <SidebarProvider>
        <Sidebar />
        <SidebarInset className={'bg-surface-page'}>
            {children}
        </SidebarInset>
    </SidebarProvider>
)

export default DashboardLayout
