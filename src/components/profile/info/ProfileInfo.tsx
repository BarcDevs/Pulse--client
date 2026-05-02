import { formatByUserPreference } from '@/lib/time'

import { profilePageTexts } from '@/constants/componentTexts/profile'

type ProfileInfoProps = {
    firstName: string
    lastName: string
    createdAt: string
    dateFormat?: string
}

export const ProfileInfo = ({
    firstName,
    lastName,
    createdAt,
    dateFormat
}: ProfileInfoProps) => {
    const memberDate = formatByUserPreference(
        new Date(createdAt),
        false,
        dateFormat
    )

    return (
        <div>
            <h2 className={'mt-4 text-xl font-semibold text-foreground'}>
                {`${firstName} ${lastName}`}
            </h2>
            <p className={'text-sm text-muted-foreground'}>
                {`${profilePageTexts.info.memberSince} ${memberDate}`}
            </p>
        </div>
    )
}