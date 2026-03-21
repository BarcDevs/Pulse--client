import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

import {
    PROFILE_LEVEL_BADGE,
    PROFILE_MEMBER_SINCE,
    PROFILE_NAME,
    PROFILE_STATS,
} from '@/constants/profileTexts'

export const ProfileCard = () => (
  <Card className={'border-0 shadow-sm'}>
    <CardContent className={'flex flex-col items-center pt-8 text-center'}>
      {/* Avatar */}
      <div className={'relative'}>
        <Avatar className={'size-24 border-4 border-primary-light'}>
          <AvatarImage src={'/avatars/alex.jpg'} alt={PROFILE_NAME} />
          <AvatarFallback className={'bg-primary text-2xl text-white'}>
            {'AR'}
          </AvatarFallback>
        </Avatar>
        <div className={'absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full border-2 border-white bg-secondary'}>
          <span className={'text-xs font-bold text-white'}>
            {'4'}
          </span>
        </div>
      </div>

      {/* Name */}
      <h2 className={'mt-4 text-xl font-semibold text-foreground'}>
        {PROFILE_NAME}
      </h2>
      <p className={'text-sm text-muted-foreground'}>
        {PROFILE_MEMBER_SINCE}
      </p>

      {/* Level Badge */}
      <Badge className={'mt-3 bg-secondary text-white'}>
        {PROFILE_LEVEL_BADGE}
      </Badge>

      {/* Stats */}
      <div className={'mt-6 grid w-full grid-cols-3 gap-4 border-t border-border pt-6'}>
        <div className={'text-center'}>
          <p className={'text-2xl font-bold text-foreground'}>
            {PROFILE_STATS.days.value}
          </p>
          <p className={'text-xs text-muted-foreground'}>
            {PROFILE_STATS.days.label}
          </p>
        </div>
        <div className={'text-center'}>
          <p className={'text-2xl font-bold text-foreground'}>
            {PROFILE_STATS.milestones.value}
          </p>
          <p className={'text-xs text-muted-foreground'}>
            {PROFILE_STATS.milestones.label}
          </p>
        </div>
        <div className={'text-center'}>
          <p className={'text-2xl font-bold text-foreground'}>
            {PROFILE_STATS.healthScore.value}
          </p>
          <p className={'text-xs text-muted-foreground'}>
            {PROFILE_STATS.healthScore.label}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
)
