import '@testing-library/jest-dom'
import {
    afterEach,
    vi
} from 'vitest'

vi.mock(
    'next/navigation',
    () => ({
        useRouter() {
            return {
                push: vi.fn(),
                replace: vi.fn(),
                prefetch: vi.fn(),
                back: vi.fn(),
                forward: vi.fn(),
                refresh: vi.fn()
            }
        },
        usePathname() {
            return '/'
        },
        useSearchParams() {
            return new URLSearchParams()
        },
        useParams() {
            return {}
        },
        redirect: vi.fn()
    })
)

vi.mock(
    'next/image',
    () => ({
        default: (props: any) => props
    })
)

afterEach(() => {
    vi.clearAllMocks()
})
