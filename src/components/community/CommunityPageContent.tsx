'use client'

import { useState } from 'react'

import { FEATURES } from '@/config/features'

import { Categories } from './categories/Categories'
import { PostList } from './posts/PostList'
import { CommunityPanel } from './CommunityPanel'

export const CommunityPageContent = () => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null)

    return FEATURES.forumLinking ? (
        <div className={'p-6'}>
            <Categories/>

            <div className={'mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6'}>
                <div className={'lg:col-span-2'}>
                    <PostList tag={selectedTag}/>
                </div>

                <CommunityPanel
                    selectedTag={selectedTag}
                    onTagSelect={setSelectedTag}
                />
            </div>
        </div>
    ) : null
}
