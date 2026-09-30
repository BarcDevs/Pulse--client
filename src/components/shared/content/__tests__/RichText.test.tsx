import {
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { render } from '@testing-library/react'

import { RichText } from '@/components/shared/content/RichText'

vi.mock('@/context/AuthContext', () => ({
    useAuth: () => ({ user: { id: '1' } })
}))

describe('RichText', () => {
    it('renders plain text untouched', () => {
        const { container } = render(<RichText text={'Nothing to link here.'}/>)

        expect(container.textContent).toBe('Nothing to link here.')
        expect(container.querySelector('a')).toBeNull()
    })

    it('turns a known tag into a link to that page', () => {
        const { container } = render(
            <RichText text={'Read our <privacy>Privacy Policy</privacy> first.'}/>
        )

        const link = container.querySelector('a')

        expect(link?.getAttribute('href')).toBe('/privacy')
        expect(link?.textContent).toBe('Privacy Policy')
        expect(container.textContent).toBe('Read our Privacy Policy first.')
    })

    it('links several tags in one string', () => {
        const { container } = render(
            <RichText text={'Open <settings>Settings</settings> or <contact>contact us</contact>.'}/>
        )

        const hrefs = [...container.querySelectorAll('a')].map((a) => a.getAttribute('href'))

        expect(hrefs).toEqual(['/profile/settings', '/support#contact'])
    })

    it('opens links in a new tab when asked to', () => {
        const { container } = render(
            <RichText
                text={'Accept the <terms>Terms</terms>.'}
                openInNewTab
            />
        )

        const link = container.querySelector('a')

        expect(link?.getAttribute('target')).toBe('_blank')
        expect(link?.getAttribute('rel')).toBe('noopener noreferrer')
    })

    it('keeps links in the same tab by default', () => {
        const { container } = render(<RichText text={'See <terms>Terms</terms>.'}/>)

        expect(container.querySelector('a')?.getAttribute('target')).toBeNull()
    })

    it('shows the label without a link for an unknown tag', () => {
        const { container } = render(<RichText text={'See <nowhere>this</nowhere>.'}/>)

        expect(container.querySelector('a')).toBeNull()
        expect(container.textContent).toBe('See this.')
    })
})
