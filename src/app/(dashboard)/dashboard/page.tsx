import {DashboardContent} from '@/components/dashboard/DashboardContent'
import {Header} from '@/components/layout/Header'

import * as DashboardTexts from '@/constants/dashboardTexts'

const DashboardPage = () => (
    <>
        <Header
            title={DashboardTexts.DASHBOARD_TITLE}
            subtitle={DashboardTexts.DASHBOARD_SUBTITLE}
        />
        <DashboardContent/>
    </>
)

export default DashboardPage
