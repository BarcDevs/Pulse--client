import {
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { fireEvent, render } from '@testing-library/react'

import { FoldablePanel } from '@/components/shared/content/FoldablePanel'

describe('FoldablePanel', () => {
    it('keeps closed content in the DOM, findable by the browser', () => {
        const { container, getByText } = render(
            <FoldablePanel
                open={false}
                onFound={vi.fn()}
            >
                <p>Hidden answer</p>
            </FoldablePanel>
        )

        expect(getByText('Hidden answer')).toBeTruthy()
        expect(container.firstElementChild?.firstElementChild?.getAttribute('hidden')).toBe('until-found')
    })

    it('is not hidden when open', () => {
        const { container } = render(
            <FoldablePanel
                open
                onFound={vi.fn()}
            >
                <p>Shown answer</p>
            </FoldablePanel>
        )

        expect(container.firstElementChild?.firstElementChild?.hasAttribute('hidden')).toBe(false)
    })

    it('asks to open when the browser finds text inside it', () => {
        const onFound = vi.fn()
        const { container } = render(
            <FoldablePanel
                open={false}
                onFound={onFound}
            >
                <p>Hidden answer</p>
            </FoldablePanel>
        )

        fireEvent(container.firstElementChild?.firstElementChild as Element, new Event('beforematch'))

        expect(onFound).toHaveBeenCalledTimes(1)
    })
})
