import { LayoutProps } from '@/types/react'

import { AppHeader } from '@/components/AppHeader'
import { DashboardClientProviders } from '@/components/layout/DashboardClientProviders'
import { MobileNavBar } from '@/components/layout/mobileNav/MobileNavBar'
import { Sidebar } from '@/components/layout/sidebar/Sidebar'
import { Footer } from '@/components/shared/footer/Footer'

const DashboardLayout = ({
    children
}: LayoutProps) => (
    <DashboardClientProviders>
        <div className={'flex flex-col min-h-screen'}>
            <div className={'flex flex-1 overflow-clip'}>
                <Sidebar className={'top-0 h-screen self-start'}/>
                <div className={'flex flex-col flex-1'}>
                    <AppHeader/>
                    <main className={'flex-1 overflow-x-clip bg-surface-page'}>
                        {children}
                    </main>
                </div>
            </div>
            <Footer className={'pb-20 sm:pb-0'}/>
        </div>
        <MobileNavBar/>
    </DashboardClientProviders>
)

export default DashboardLayout
