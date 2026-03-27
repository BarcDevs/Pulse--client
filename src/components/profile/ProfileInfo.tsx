import {profilePageTexts} from '@/constants/componentTexts/profile'

type ProfileInfoProps = {
    firstName: string
    lastName: string
}

export const ProfileInfo = ({
    firstName,
    lastName
}: ProfileInfoProps) => (
    <div>
        <h2 className={'mt-4 text-xl font-semibold text-foreground'}>
            {`${firstName} ${lastName}`}
        </h2>
        <p className={'text-sm text-muted-foreground'}>
            {profilePageTexts.memberSince}
        </p>
    </div>
)