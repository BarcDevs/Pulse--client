import {ActiveGoals} from './ActiveGoals'
import {ProfileBasicInfo} from './BasicInfo'
import {DailyActivityPreferences} from './DailyActivityPreferences'
import {ProfileCard} from './ProfileCard'
import {RecoveryIdentity} from './RecoveryIdentity'
import {SystemPrivacy} from './SystemPrivacy'

export const ProfileContent = () => (
    <div className={'p-6 space-y-6'}>
        <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
            <ProfileCard/>
            <div className={'lg:col-span-2'}>
                <ProfileBasicInfo/>
            </div>
        </div>

        <RecoveryIdentity/>

        <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
            <div className={'lg:col-span-2'}>
                <DailyActivityPreferences/>
            </div>
            <ActiveGoals/>
        </div>

        <SystemPrivacy/>
    </div>
)
