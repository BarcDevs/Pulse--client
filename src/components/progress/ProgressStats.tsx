import {MilestonesCard} from './MilestonesCard'
import {StreakCard} from './StreakCard'

export const ProgressStats = () => (
    <div className={'lg:col-span-2 grid grid-cols-2 gap-4'}>
        <StreakCard/>
        <MilestonesCard/>
    </div>
)
