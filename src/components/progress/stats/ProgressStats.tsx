import { MilestonesCard } from '../cards/MilestonesCard'
import { StreakCard } from '../cards/StreakCard'
import { WellnessCard } from '../cards/WellnessCard'

export const ProgressStats = () => (
    <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
        <StreakCard/>
        <MilestonesCard/>
        <WellnessCard/>
    </div>
)
