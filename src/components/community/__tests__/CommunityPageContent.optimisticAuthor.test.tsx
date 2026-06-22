import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import {
    fireEvent,
    render,
    screen
} from '@testing-library/react'

vi.mock('sonner', () => ({
    toast: {
        info: vi.fn(),
        error: vi.fn(),
        success: vi.fn()
    }
}))

vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key
}))

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: vi.fn() }),
    usePathname: () => '/community',
    useSearchParams: () => new URLSearchParams()
}))

vi.mock('@/context/AuthContext', () => ({
    useAuth: vi.fn()
}))

const mutateAsync = vi.fn(() => new Promise(() => {}))

vi.mock('@/hooks/mutations/useCreatePostMutation', () => ({
    useCreatePostMutation: () => ({
        mutateAsync,
        isPending: false
    })
}))

vi.mock('@/hooks/useAuthExpiredToast', () => ({
    useAuthExpiredToast: () => ({
        showSessionExpired: vi.fn(),
        showAuthExpiredWithDraft: vi.fn()
    })
}))

vi.mock('@/hooks/useDebounce', () => ({
    useDebounce: (v: string) => v
}))

vi.mock('@/utils/communityDraft', () => ({
    getDraft: vi.fn(() => null),
    saveDraft: vi.fn(),
    clearDraft: vi.fn(),
    DRAFT_KEYS: {
        newPost: 'community:draft:post',
        newReply: (id: string) => `community:draft:reply:${id}`,
        updatePost: (id: string) => `community:draft:updatepost:${id}`,
        updateReply: (postId: string, replyId: string) =>
            `community:draft:updatereply:${postId}:${replyId}`
    }
}))

vi.mock('@/components/community/CommunitySearchBar', () => ({
    CommunitySearchBar: () => <div/>
}))

vi.mock('@/components/community/postForm/PostForm', () => ({
    PostForm: ({ onSubmitAction }: { onSubmitAction: (data: unknown) => void }) => (
        <button
            data-testid={'submit-post'}
            onClick={() => onSubmitAction({
                title: 'Hello',
                body: 'World',
                category: 'recovery'
            })}
        >
            Submit
        </button>
    )
}))

vi.mock('@/components/community/posts/PostList', () => ({
    PostList: ({ prependPosts }: { prependPosts: { author?: { user: { username: string }} }[] }) => (
        <div data-testid={'pending-author'}>
            {prependPosts[0]?.author?.user.username ?? 'Anonymous'}
        </div>
    )
}))

vi.mock('@/components/community/CommunityPanel', () => ({
    CommunityPanel: () => <div/>
}))

vi.mock('@/components/shared/SavingBanner', () => ({
    SavingBanner: () => <div/>
}))

vi.mock('@/components/community/NewPostFloatingButton', () => ({
    NewPostFloatingButton: () => <div/>
}))

import { CommunityPageContent } from '@/components/community/CommunityPageContent'

import { useAuth } from '@/context/AuthContext'

const mockUser = {
    id: 'user-1',
    username: 'testuser',
    firstName: 'Test',
    lastName: 'User',
    profile: { image: null }
}

describe('CommunityPageContent — optimistic post author', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.mocked(useAuth).mockReturnValue({ user: mockUser } as any)
    })

    it('shows the real author username on the optimistic post, not Anonymous', () => {
        render(<CommunityPageContent/>)
        fireEvent.click(screen.getByTestId('submit-post'))

        expect(screen.getByTestId('pending-author')).toHaveTextContent('testuser')
    })
})
