import { Badge } from '@/components/ui/badge'

import { profilePageTexts } from '@/constants/componentTexts/profile'

export const ProfileLevel = () => (
    <Badge className={'mt-3 bg-secondary text-white'}>
        {profilePageTexts.levelBadge}
    </Badge>
)