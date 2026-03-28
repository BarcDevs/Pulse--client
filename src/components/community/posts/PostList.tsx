'use client'

import {useState} from 'react'

import {Button} from '@/components/ui/button'

import {cn} from '@/lib/utils'

import {communityPageTexts} from '@/constants/componentTexts/community'

import {PostItem} from './postList/PostItem'

const tabs = communityPageTexts.posts.tabs

const posts = communityPageTexts.posts

export const PostList = () => {
    const [activeTab, setActiveTab] = useState(
        communityPageTexts.posts.defaultTab
    )

    const handleTabChange = (tab: string) =>
        setActiveTab(tab)

    return (
        <div className={'rounded-2xl bg-surface-card overflow-hidden'}>
            <div className={'flex border-b border-border'}>
                {tabs.map((tab) => (
                    <Button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        variant={activeTab === tab ?
                            'default' :
                            'ghost'}
                        className={cn(
                            'px-6 py-4 text-sm font-medium rounded-none border-b-2',
                            activeTab === tab ?
                                'text-primary border-primary' :
                                'text-muted-foreground hover:text-foreground border-transparent'
                        )}
                    >
                        {tab}
                    </Button>
                ))}
            </div>

            <div className={'divide-y divide-border'}>
                {posts.list.map((post) => (
                    <PostItem
                        key={post.id}
                        post={post}
                    />
                ))}
            </div>
        </div>
    )
}
