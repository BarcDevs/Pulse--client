import {PROFILE_STATS} from '@/constants/profileTexts'

import {ProfileStatItem} from './ProfileStatItem'

export const ProfileStats = () => (
    <div className={'mt-6 grid w-full grid-cols-3 gap-4 border-t border-border pt-6'}>
        <ProfileStatItem
            value={PROFILE_STATS.days.value}
            label={PROFILE_STATS.days.label}
        />
        <ProfileStatItem
            value={PROFILE_STATS.milestones.value}
            label={PROFILE_STATS.milestones.label}
        />
        <ProfileStatItem
            value={PROFILE_STATS.healthScore.value}
            label={PROFILE_STATS.healthScore.label}
        />
    </div>
)
