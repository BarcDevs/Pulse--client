import {LayoutProps} from '@/types'

import {AppHeader} from '@/components/AppHeader'
import {Footer} from '@/components/shared/Footer'
import {CustomSidebar} from '@/components/sidebar/CustomSidebar'

const DashboardLayout = ({
    children
}: LayoutProps) => (
    <div className='flex flex-col min-h-screen'>
        <div className='flex flex-1 overflow-hidden'>
            <CustomSidebar />
            <div className='flex flex-col flex-1'>
                <AppHeader title='Dashboard' />
                <main className='flex-1 overflow-auto bg-surface-page'>
                    {children}
                </main>
            </div>
        </div>
        <Footer />
    </div>
)

export default DashboardLayout
