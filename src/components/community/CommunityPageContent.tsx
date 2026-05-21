'use client'

import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { PostForm } from '@/components/community/postForm/PostForm'

import { useCreatePostMutation } from '@/hooks/mutations/useCreatePostMutation'
import { useDebounce } from '@/hooks/useDebounce'

import { PostFormSchema } from '@/validations/forms/postFormSchema'

import { PostList } from './posts/PostList'
import { CommunityPanel } from './CommunityPanel'
import { CommunitySearchBar } from './CommunitySearchBar'

export const CommunityPageContent = () => {
    const searchParams = useSearchParams()
    const [selectedTag, setSelectedTag] = useState<string | null>(
        searchParams.get('tag')
    )
    const [isNewPostOpen, setIsNewPostOpen] = useState(false)
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search)
    const createPost = useCreatePostMutation()

    const handlePostSubmit = async (
        data: PostFormSchema
    ) => {
        await createPost.mutateAsync(data)
        setIsNewPostOpen(false)
    }

    return (
        <div className={'p-6'}>
            <div className={'mt-2 grid grid-cols-1 lg:grid-cols-3 gap-6'}>
                <div className={'lg:col-span-2 flex flex-col gap-4'}>
                    <CommunitySearchBar
                        searchValue={search}
                        onSearchAction={setSearch}
                        onNewPostAction={() => setIsNewPostOpen(true)}
                        isPostOpen={isNewPostOpen}
                    />
                    <PostForm
                        isReply={false}
                        isOpen={isNewPostOpen}
                        isLoading={createPost.isPending}
                        onSubmitAction={handlePostSubmit}
                        onCancelAction={() => setIsNewPostOpen(false)}
                    />
                    <PostList
                        tag={selectedTag}
                        search={debouncedSearch}
                        onTagSelectAction={setSelectedTag}
                    />
                </div>

                <CommunityPanel
                    selectedTag={selectedTag}
                    onTagSelect={setSelectedTag}
                />
            </div>
        </div>
    )
}
