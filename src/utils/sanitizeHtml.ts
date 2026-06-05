import DOMPurify from 'dompurify'

if (typeof window !== 'undefined') {
    DOMPurify.removeHook(
        'afterSanitizeAttributes'
    )
    DOMPurify.addHook(
        'afterSanitizeAttributes',
        (node) => {
            if (node.tagName !== 'A') {
                return
            }
            const href =
                node.getAttribute('href') || ''
            if (
                href
                && !/^(https?:\/\/|mailto:|tel:|#|\/)/.test(
                    href
                )
            ) {
                node.setAttribute(
                    'href',
                    `https://${href}`
                )
            }
            node.setAttribute(
                'target',
                '_blank'
            )
            node.setAttribute(
                'rel',
                'noopener noreferrer'
            )
        }
    )
}

export const sanitizeHtml = (
    html: string
): string =>
    DOMPurify.sanitize(html, {
        ADD_ATTR: ['target', 'rel']
    })

export const stripHtml = (
    html: string
): string => {
    if (typeof window === 'undefined') {
        return html
            .replace(/<[^>]*>/g, '')
            .trim()
    }
    const doc =
        new DOMParser()
            .parseFromString(
                html,
                'text/html'
            )
    return (
        doc.body.textContent?.trim()
        ?? ''
    )
}
