import * as communityTexts from '@/constants/communityTexts'

import { MentorItem } from './MentorItem'

const mentors = communityTexts.COMMUNITY_MENTORS

export const MentorsCard = () => (
    <div className={'rounded-2xl bg-surface-card p-5'}>
        <h3 className={'mb-4 font-semibold text-foreground'}>
            {communityTexts.COMMUNITY_MENTORS_TITLE}
        </h3>
        <div className={'space-y-3'}>
            {mentors.map((mentor) => (
                <MentorItem
                    key={mentor.id}
                    id={String(mentor.id)}
                    avatar={mentor.avatar}
                    name={mentor.name}
                    role={mentor.role}
                    online={mentor.online}
                />
            ))}
        </div>
    </div>
)