import DOMPurify from 'dompurify'

export const sanitizeHtml = (html: string): string => {
    return DOMPurify.sanitize(html)
}
