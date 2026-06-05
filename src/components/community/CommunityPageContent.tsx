'use client'

import { useRef, useState } from 'react'

import {
    usePathname,
    useRouter,
    useSearchParams
} from 'next/navigation'
import { useTranslations } from 'next-intl'

import { toast } from 'sonner'

import { Post } from '@/types/community'

import { PostForm } from '@/components/community/postForm/PostForm'
import { SavingBanner } from '@/components/shared/SavingBanner'

import { useCreatePostMutation } from '@/hooks/mutations/useCreatePostMutation'
import { useAuthExpiredToast } from '@/hooks/useAuthExpiredToast'
import { useDebounce } from '@/hooks/useDebounce'

import {
    clearDraft,
    DRAFT_KEYS,
    getDraft,
    saveDraft
} from '@/utils/communityDraft'
import { isUnauthorizedError } from '@/utils/error'

import { ROUTES } from '@/constants/routes'
import { secondInMs } from '@/constants/time'

import { useAuth } from '@/context/AuthContext'

import { communityLocales } from '@/locales/communityLocales'
import { globalLocales } from '@/locales/globalLocales'
import { PostFormSchema } from '@/validations/forms/postFormSchema'

import { PostList } from './posts/PostList'
import { CommunityPanel } from './CommunityPanel'
import { CommunitySearchBar } from './CommunitySearchBar'

export const CommunityPageContent = () => {
    const t = useTranslations()
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const { user } = useAuth()
    const { showAuthExpiredWithDraft } = useAuthExpiredToast()
    const [selectedTag, setSelectedTag] = useState<string | null>(
        searchParams.get('tag')
    )
    const [isNewPostOpen, setIsNewPostOpen] = useState(
        () => !!(getDraft(DRAFT_KEYS.newPost) && user)
    )
    const [search, setSearch] = useState('')
    const [pendingPosts, setPendingPosts] = useState<Post[]>([])
    const tempCountRef = useRef(0)
    const debouncedSearch = useDebounce(search)
    const createPost = useCreatePostMutation()

    const [postDraft] = useState(() => getDraft(DRAFT_KEYS.newPost)?.data)

    const handleOpenNewPost = () => {
        if (!user) {
            toast.info(t(communityLocales.toasts.loginToCreate), {
                action: {
                    label: t(communityLocales.toasts.loginButton),
                    onClick: () => router.push(
                        ROUTES.loginWithRedirect(pathname)
                    )
                }
            })
            return
        }
        setIsNewPostOpen(true)
    }

    const handlePostSubmit = async (data: PostFormSchema) => {
        tempCountRef.current += 1
        const tempPost: Post = {
            id: `temp-post-${tempCountRef.current}`,
            title: data.title ?? '',
            body: data.body,
            category: data.category ?? '',
            tags: [],
            replies: [],
            views: 0,
            createdAt: new Date(),
            updatedAt: null,
            authorId: user?.id ?? ''
        }
        setPendingPosts((prev) => [tempPost, ...prev])
        setIsNewPostOpen(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })

        try {
            const realPost = await createPost.mutateAsync(data)
            setPendingPosts((prev) =>
                prev.map((p) => p.id === tempPost.id ? realPost : p)
            )
            clearDraft(DRAFT_KEYS.newPost)
            toast.success(
                t(communityLocales.toasts.postPublished),
                { duration: 2.5 * secondInMs }
            )
        } catch (error) {
            setPendingPosts((prev) =>
                prev.filter((p) => p.id !== tempPost.id)
            )
            if (isUnauthorizedError(error as Error)) {
                saveDraft(DRAFT_KEYS.newPost, 'newPost', data)
                showAuthExpiredWithDraft()
                return
            }
            toast.error(
                t(communityLocales.toasts.postPublishFailed),
                {
                    action: {
                        label: t(globalLocales.shared.retry),
                        onClick: () => void handlePostSubmit(data)
                    },
                    duration: 5 * secondInMs
                }
            )
        }
    }

    return (
        <div className={'p-6'}>
            {createPost.isPending && (
                <div className={'mb-4'}>
                    <SavingBanner message={t(communityLocales.savingMessage)}/>
                </div>
            )}
            <div className={'mt-2 grid grid-cols-1 lg:grid-cols-3 gap-6'}>
                <div className={'lg:col-span-2 flex flex-col gap-4'}>
                    <CommunitySearchBar
                        searchValue={search}
                        onSearchAction={setSearch}
                        onNewPostAction={handleOpenNewPost}
                        isPostOpen={isNewPostOpen}
                    />
                    <PostForm
                        isReply={false}
                        isOpen={isNewPostOpen}
                        isLoading={createPost.isPending}
                        onSubmitAction={handlePostSubmit}
                        onCancelAction={() => setIsNewPostOpen(false)}
                        defaultValues={postDraft}
                    />
                    <PostList
                        tag={selectedTag}
                        search={debouncedSearch}
                        onTagSelectAction={setSelectedTag}
                        prependPosts={pendingPosts}
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
