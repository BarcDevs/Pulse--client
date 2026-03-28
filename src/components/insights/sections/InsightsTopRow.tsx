import {CriticalInsight} from '../cards/CriticalInsight'
import {MilestoneCard} from '../cards/MilestoneCard'

export const InsightsTopRow = () => (
    <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6 lg:col-span-2'}>
        <div className={'lg:col-span-2'}>
            <CriticalInsight/>
        </div>
        <MilestoneCard/>
    </div>
)
