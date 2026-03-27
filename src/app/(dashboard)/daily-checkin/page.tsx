import {CheckInContent} from '@/components/checkIn/CheckInContent'
import {Header} from '@/components/layout/Header'

import {HEADER_HEALTH_OVERVIEW} from '@/constants/layoutTexts'

const DailyCheckInPage = () => (
    <>
        <Header title={HEADER_HEALTH_OVERVIEW}/>
        <CheckInContent/>
    </>
)

export default DailyCheckInPage
