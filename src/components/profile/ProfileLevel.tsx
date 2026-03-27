import {Badge} from '@/components/ui/badge'

import {PROFILE_LEVEL_BADGE} from '@/constants/profileTexts'

export const ProfileLevel = () => (
    <Badge className={'mt-3 bg-secondary text-white'}>
        {PROFILE_LEVEL_BADGE}
    </Badge>
)