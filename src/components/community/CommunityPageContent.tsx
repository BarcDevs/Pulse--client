import { Categories } from './categories/Categories'
import { PostList } from './posts/PostList'
import { CommunityPanel } from './CommunityPanel'

export const CommunityPageContent = () => (
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
