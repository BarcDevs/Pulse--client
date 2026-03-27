import {profilePageTexts} from '@/constants/componentTexts/profile'

import {ProfileStatItem} from './ProfileStatItem'

export const ProfileStats = () => (
    <div className={'mt-6 grid w-full grid-cols-3 gap-4 border-t border-border pt-6'}>
        <ProfileStatItem
            value={profilePageTexts.stats.days.value}
            label={profilePageTexts.stats.days.label}
        />
        <ProfileStatItem
            value={profilePageTexts.stats.milestones.value}
            label={profilePageTexts.stats.milestones.label}
        />
        <ProfileStatItem
            value={profilePageTexts.stats.healthScore.value}
            label={profilePageTexts.stats.healthScore.label}
        />
    </div>
)
