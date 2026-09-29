import { TRUSTED_IMAGE_HOSTS } from '@/constants/trustedImageHosts'

/** Allows only our own origin or an https trusted host, resolving relative
 * and protocol-relative URLs the way the browser will. Mirrors the server. */
export const isTrustedImageUrl = (src?: string | null): boolean => {
    if (!src || typeof window === 'undefined') return false

    try {
        const { origin } = window.location
        const url = new URL(src, origin)

        if (url.origin === origin) return true

        return url.protocol === 'https:'
            && TRUSTED_IMAGE_HOSTS.includes(url.hostname)
    } catch {
        return false
    }
}

// An untrusted image host would see every reader's IP, so an https image
// becomes a plain link and anything else keeps only its alt text
export const replaceUntrustedImages = (html: string): string => {
    if (typeof window === 'undefined' || !html.includes('<img')) return html

    const doc = new DOMParser().parseFromString(html, 'text/html')

    doc.querySelectorAll('img').forEach((img) => {
        const src = img.getAttribute('src') ?? ''
        if (isTrustedImageUrl(src)) return

        const label = img.getAttribute('alt') || ''

        if (!/^https:\/\//i.test(src)) {
            img.replaceWith(doc.createTextNode(label))
            return
        }

        const link = doc.createElement('a')
        link.setAttribute('href', src)
        link.setAttribute('target', '_blank')
        link.setAttribute('rel', 'noopener noreferrer')
        link.textContent = label || src
        img.replaceWith(link)
    })

    return doc.body.innerHTML
}
