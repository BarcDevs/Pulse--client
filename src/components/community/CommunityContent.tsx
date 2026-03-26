import {Categories} from './Categories'
import {CommunityPanel} from './CommunityPanel'
import {PostList} from './PostList'

export const CommunityContent = () => (
    <div className={'p-6'}>
        <Categories/>

        <div className={'mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6'}>
            <div className={'lg:col-span-2'}>
                <PostList/>
            </div>
            <CommunityPanel/>
        </div>
    </div>
)
