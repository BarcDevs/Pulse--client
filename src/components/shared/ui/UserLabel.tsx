import { twMerge } from 'tailwind-merge'

import { PartialUser } from '@/types'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar'

import { getUserFallback } from '@/lib/utils'

type Props = {
    user: PartialUser
    withName?: boolean
    textStyles?: string
    image?: string
}

export const UserLabel = ({
    user: { firstName, lastName, username },
    withName,
    textStyles,
    image,
}: Props) => (
    <div className={'flex-center flex-row flex-wrap gap-1'}>
        <Avatar>
            <AvatarImage src={image}/>
            <AvatarFallback className={'bg-gray-500 text-white'}>
                {getUserFallback(firstName, lastName)}
            </AvatarFallback>
        </Avatar>

        <div
            className={twMerge(
                'flex flex-col font-bold',
                textStyles,
            )}
        >
            <p>{username}</p>

            {withName && (
                <p
                    className={'line-clamp-1 text-xs font-semibold max-sm:hidden'}
                >
                    {firstName} {lastName}
                </p>
            )}
        </div>
    </div>
)
