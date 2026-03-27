import {CheckInContent} from '@/components/checkIn/CheckInContent'
import {AppShell} from '@/components/layout/AppShell'
import {Header} from '@/components/layout/Header'

import {HEADER_HEALTH_OVERVIEW} from '@/constants/layoutTexts'

const DailyCheckInPage = () => (
    <AppShell>
        <Header title={HEADER_HEALTH_OVERVIEW}/>
        <CheckInContent/>
    </AppShell>
)

export default DailyCheckInPage
