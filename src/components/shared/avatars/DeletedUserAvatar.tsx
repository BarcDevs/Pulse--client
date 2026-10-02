import { User } from 'lucide-react'

import {
    Avatar,
    AvatarFallback
} from '@/components/ui/avatar'

/** Generic grey avatar for an author whose account no longer exists */
export const DeletedUserAvatar = () => (
    <Avatar className={'size-9'}>
        <AvatarFallback className={'bg-muted text-muted-foreground'}>
            <User className={'size-4'}/>
        </AvatarFallback>
    </Avatar>
)
