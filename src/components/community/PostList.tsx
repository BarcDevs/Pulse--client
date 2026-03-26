'use client'

import {useState} from 'react'

import {Button} from '@/components/ui/button'

import {cn} from '@/lib/utils'

import * as CommunityTexts from '@/constants/communityTexts'

import {PostItem} from './post-list/PostItem'

const tabs = CommunityTexts.COMMUNITY_TABS

const posts = CommunityTexts.COMMUNITY_POSTS

export const PostList = () => {
    const [activeTab, setActiveTab] = useState(
        CommunityTexts.COMMUNITY_POST_DEFAULT_TAB
    )

    return (
        <div className={'rounded-2xl bg-surface-card overflow-hidden'}>
            <div className={'flex border-b border-border'}>
                {tabs.map((tab) => (
                    <Button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        variant={
                            activeTab === tab
                                ? 'default'
                                : 'ghost'
                        }
                        className={cn(
                            'px-6 py-4 text-sm font-medium rounded-none border-b-2',
                            activeTab === tab
                                ? 'text-primary border-primary'
                                : 'text-muted-foreground hover:text-foreground border-transparent'
                        )}
                    >
                        {tab}
                    </Button>
                ))}
            </div>

            <div className={'divide-y divide-border'}>
                {posts.map((post) => (
                    <PostItem
                        key={post.id}
                        post={post}
                    />
                ))}
            </div>
        </div>
    )
}
