'use client'

import { useState } from 'react'

import { Bookmark, MessageSquare, Play, Share2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import * as CommunityTexts from '@/constants/communityTexts'

const tabs = CommunityTexts.COMMUNITY_TABS

const posts = CommunityTexts.COMMUNITY_POSTS

export const PostList = () => {
  const [activeTab, setActiveTab] = useState(
      CommunityTexts.COMMUNITY_POST_DEFAULT_TAB
  )

  return (
    <div className={'rounded-2xl bg-surface-card overflow-hidden'}>
      {/* Tabs */}
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

      {/* Posts */}
      <div className={'divide-y divide-border'}>
        {posts.map((post) => (
          <div key={post.id} className={'p-6 hover:bg-surface-section/50 transition-colors'}>
            <div className={'flex gap-4'}>
              {/* Votes */}
              <div className={'flex flex-col items-center gap-1'}>
                <Button
                  variant={'ghost'}
                  size={'sm'}
                  className={'h-6 w-6 p-0 text-muted-foreground hover:text-primary'}
                >
                  <svg className={'h-5 w-5'} fill={'none'} viewBox={'0 0 24 24'} stroke={'currentColor'}>
                    <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={2} d={'M5 15l7-7 7 7'} />
                  </svg>
                </Button>
                <span className={'text-sm font-semibold text-foreground'}>{post.votes}</span>
                <Button
                  variant={'ghost'}
                  size={'sm'}
                  className={'h-6 w-6 p-0 text-muted-foreground hover:text-primary'}
                >
                  <svg className={'h-5 w-5'} fill={'none'} viewBox={'0 0 24 24'} stroke={'currentColor'}>
                    <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={2} d={'M19 9l-7 7-7-7'} />
                  </svg>
                </Button>
              </div>

              {/* Content */}
              <div className={'flex-1 min-w-0'}>
                <div className={'flex items-center gap-2 mb-2'}>
                  <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', post.categoryColor)}>
                    {post.category}
                  </span>
                  <span className={'text-xs text-muted-foreground'}>
                    {CommunityTexts.COMMUNITY_POSTED_BY} {post.author} - {post.timeAgo}
                  </span>
                </div>

                <h3 className={'font-semibold text-foreground mb-2'}>{post.title}</h3>
                
                {post.content && (
                  <p className={'text-sm text-muted-foreground line-clamp-2'}>{post.content}</p>
                )}

                {post.hasMedia && (
                  <div className={'mt-3 relative rounded-xl overflow-hidden bg-surface-section aspect-video'}>
                    <div className={'absolute inset-0 flex items-center justify-center'}>
                      <div className={'h-14 w-14 rounded-full bg-primary/90 flex items-center justify-center'}>
                        <Play className={'h-6 w-6 text-primary-foreground ml-1'} fill={'currentColor'} />
                      </div>
                    </div>
                    <div className={'absolute bottom-3 left-3 bg-black/60 rounded px-2 py-1 text-xs text-white'}>
                      {CommunityTexts.COMMUNITY_POST_VIDEO_DURATION}
                    </div>
                  </div>
                )}

                <div className={'flex items-center gap-4 mt-4'}>
                  <Button
                    variant={'ghost'}
                    size={'sm'}
                    className={'h-auto gap-1.5 p-0 text-xs text-muted-foreground hover:text-foreground'}
                  >
                    <MessageSquare className={'h-4 w-4'} />
                    {post.replies} {CommunityTexts.COMMUNITY_REPLIES_LABEL}
                  </Button>
                  <Button
                    variant={'ghost'}
                    size={'sm'}
                    className={'h-auto gap-1.5 p-0 text-xs text-muted-foreground hover:text-foreground'}
                  >
                    <Share2 className={'h-4 w-4'} />
                    {CommunityTexts.COMMUNITY_SHARE}
                  </Button>
                  <Button
                    variant={'ghost'}
                    size={'sm'}
                    className={'h-auto gap-1.5 p-0 text-xs text-muted-foreground hover:text-foreground'}
                  >
                    <Bookmark className={'h-4 w-4'} />
                    {CommunityTexts.COMMUNITY_SAVE}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
