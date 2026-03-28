import {MilestonesCard} from '../cards/MilestonesCard'
import {StreakCard} from '../cards/StreakCard'

export const ProgressStats = () => (
    <div className={'lg:col-span-2 grid grid-cols-2 gap-4'}>
        <StreakCard/>
        <MilestonesCard/>
    </div>
)
