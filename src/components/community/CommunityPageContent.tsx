'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { PostForm } from '@/components/community/postForm/PostForm'
import { SavingBanner } from '@/components/shared/SavingBanner'

import { useCommunityPostComposer } from '@/hooks/useCommunityPostComposer'
import { useDebounce } from '@/hooks/useDebounce'

import { useCommunityTag } from '@/context/CommunityTagContext'

import { communityLocales } from '@/locales/communityLocales'

import { PostList } from './posts/PostList'
import { CommunitySearchBar } from './CommunitySearchBar'
import { NewPostFloatingButton } from './NewPostFloatingButton'

export const CommunityPageContent = () => {
    const t = useTranslations()
    const {
        selectedTag,
        setSelectedTag
    } = useCommunityTag()
    const composer = useCommunityPostComposer()
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search)

    return (
        <div className={'flex flex-col gap-4'}>
            {composer.isPublishing && (
                <SavingBanner message={t(communityLocales.savingMessage)}/>
            )}
            <CommunitySearchBar
                searchValue={search}
                onSearchAction={setSearch}
                onNewPostAction={composer.openNewPost}
                isPostOpen={composer.isNewPostOpen}
            />
            <PostForm
                isReply={false}
                isOpen={composer.isNewPostOpen}
                isLoading={composer.isPublishing}
                onSubmitAction={composer.submitPost}
                onCancelAction={composer.closeNewPost}
                defaultValues={composer.postDraft}
                showAnonymousToggle={true}
            />
            <PostList
                tag={selectedTag}
                search={debouncedSearch}
                onTagSelectAction={setSelectedTag}
                prependPosts={composer.pendingPosts}
            />
            <NewPostFloatingButton
                isPostOpen={composer.isNewPostOpen}
                onClickAction={composer.openNewPost}
            />
        </div>
    )
}
