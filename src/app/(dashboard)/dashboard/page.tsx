import {DashboardContent} from '@/components/dashboard/DashboardContent'
import {AppShell} from '@/components/layout/AppShell'
import {Header} from '@/components/layout/Header'

import * as DashboardTexts from '@/constants/dashboardTexts'

const DashboardPage = () => (
    <AppShell>
        <Header
            title={DashboardTexts.DASHBOARD_TITLE}
            subtitle={DashboardTexts.DASHBOARD_SUBTITLE}
        />
        <DashboardContent/>
    </AppShell>
)

export default DashboardPage
