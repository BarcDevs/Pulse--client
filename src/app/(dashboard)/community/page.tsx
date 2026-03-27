import {Plus} from 'lucide-react'

import {CommunityContent} from '@/components/community/CommunityContent'
import {Header} from '@/components/layout/Header'
import {Button} from '@/components/ui/button'

import * as CommunityTexts from '@/constants/communityTexts'
import * as PageSubtitles from '@/constants/pageSubtitlesTexts'

const CommunityPage = () => (
    <>
        <Header
            title={PageSubtitles.COMMUNITY_PAGE_TITLE}
            subtitle={PageSubtitles.COMMUNITY_PAGE_SUBTITLE}
            showSearch
            actions={
                <Button className={'bg-primary hover:bg-primary/90 text-primary-foreground'}>
                    <Plus className={'mr-2 h-4 w-4'}/>
                    {CommunityTexts.COMMUNITY_NEW_POST_BUTTON}
                </Button>
            }
        />
        <CommunityContent/>
    </>
)

export default CommunityPage
