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

vi.mock('@/hooks/mutations/useCreatePostMutation', () => ({
    useCreatePostMutation: () => ({
        mutateAsync: vi.fn(),
        isPending: false
    })
}))

vi.mock('@/hooks/useAuthExpiredToast', () => ({
    useAuthExpiredToast: () => ({
        showSessionExpired: vi.fn(),
        showWorkSaved: vi.fn()
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
    CommunitySearchBar: ({ onNewPostAction }: { onNewPostAction: () => void }) => (
        <button
            data-testid={'new-post-btn'}
            onClick={onNewPostAction}
        >
            New Post
        </button>
    )
}))

vi.mock('@/components/community/postForm/PostForm', () => ({
    PostForm: ({ isOpen }: { isOpen: boolean }) =>
        isOpen ? <div data-testid={'post-form'}/> : null
}))

vi.mock('@/components/community/posts/PostList', () => ({
    PostList: () => <div/>
}))

vi.mock('@/components/community/CommunityPanel', () => ({
    CommunityPanel: () => <div/>
}))

vi.mock('@/components/shared/SavingBanner', () => ({
    SavingBanner: () => <div/>
}))

import { toast } from 'sonner'

import { CommunityPageContent } from '@/components/community/CommunityPageContent'

import { getDraft } from '@/utils/communityDraft'

import { useAuth } from '@/context/AuthContext'

const mockUser = {
    id: 'user-1',
    username: 'testuser',
    firstName: 'Test',
    lastName: 'User'
}

describe('CommunityPageContent — auth guard', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.mocked(getDraft).mockReturnValue(null)
    })

    it('shows login toast instead of opening form when user is logged out', () => {
        vi.mocked(useAuth).mockReturnValue({ user: null } as any)

        render(<CommunityPageContent/>)
        fireEvent.click(screen.getByTestId('new-post-btn'))

        expect(toast.info).toHaveBeenCalledOnce()
        expect(screen.queryByTestId('post-form')).toBeNull()
    })

    it('opens post form when logged-in user clicks New Post', () => {
        vi.mocked(useAuth).mockReturnValue({ user: mockUser } as any)

        render(<CommunityPageContent/>)
        fireEvent.click(screen.getByTestId('new-post-btn'))

        expect(screen.getByTestId('post-form')).toBeInTheDocument()
        expect(toast.info).not.toHaveBeenCalled()
    })

    it('auto-opens post form on mount when draft exists for logged-in user', () => {
        vi.mocked(getDraft).mockReturnValue({
            type: 'newPost',
            data: { body: 'Draft content' },
            expiresAt: Date.now() + 60_000
        } as any)
        vi.mocked(useAuth).mockReturnValue({ user: mockUser } as any)

        render(<CommunityPageContent/>)

        expect(screen.getByTestId('post-form')).toBeInTheDocument()
    })

    it('does not auto-open form when draft exists but user is logged out', () => {
        vi.mocked(getDraft).mockReturnValue({
            type: 'newPost',
            data: { body: 'Draft content' },
            expiresAt: Date.now() + 60_000
        } as any)
        vi.mocked(useAuth).mockReturnValue({ user: null } as any)

        render(<CommunityPageContent/>)

        expect(screen.queryByTestId('post-form')).toBeNull()
    })
})
