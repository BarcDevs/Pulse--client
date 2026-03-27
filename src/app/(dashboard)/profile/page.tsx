import {Header} from '@/components/layout/Header'
import {ProfileContent} from '@/components/profile/ProfileContent'

import * as PageSubtitles from '@/constants/pageSubtitlesTexts'

const ProfilePage = () => (
    <>
        <Header
            title={PageSubtitles.PROFILE_PAGE_TITLE}
            subtitle={PageSubtitles.PROFILE_PAGE_SUBTITLE}
        />
        <ProfileContent/>
    </>
)

export default ProfilePage
