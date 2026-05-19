import { AutoRecoveryCard } from './AutoRecoveryCard'
import { JournalSavedCard } from './JournalSavedCard'
import { SystemHealthCard } from './SystemHealthCard'

export const ErrorInfoCards = () => (
    <div className={'mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-start'}>
        <JournalSavedCard/>
        <SystemHealthCard/>
        <AutoRecoveryCard/>
    </div>
)
