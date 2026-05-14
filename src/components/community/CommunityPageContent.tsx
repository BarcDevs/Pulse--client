'use client'

import { useState } from 'react'

import { PostList } from './posts/PostList'
import { CommunityPanel } from './CommunityPanel'

export const CommunityPageContent = () => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null)

    return (
        <div className={'p-6'}>
            <div className={'mt-2 grid grid-cols-1 lg:grid-cols-3 gap-6'}>
                <div className={'lg:col-span-2'}>
                    <PostList tag={selectedTag}/>
                </div>

                <CommunityPanel
                    selectedTag={selectedTag}
                    onTagSelect={setSelectedTag}
                />
            </div>
        </div>
    )
}
