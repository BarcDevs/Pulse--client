import {
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { render } from '@testing-library/react'

import { LegalFooterCta } from '@/components/legal/LegalFooterCta'

vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key
}))

describe('LegalFooterCta', () => {
    it('links the download button to the given PDF', () => {
        const { getByText } = render(
            <LegalFooterCta pdfHref={'/legal/privacy-en-US.pdf'}/>
        )

        const link = getByText('legal.common.footerCta.downloadPdf')

        expect(link.getAttribute('href')).toBe('/legal/privacy-en-US.pdf')
        expect(link.hasAttribute('download')).toBe(true)
    })

    it('is hidden when printing', () => {
        const { container } = render(
            <LegalFooterCta pdfHref={'/legal/privacy-en-US.pdf'}/>
        )

        expect(container.firstElementChild?.className).toContain('print:hidden')
    })
})
