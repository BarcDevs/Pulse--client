import {
    describe,
    expect,
    it
} from 'vitest'

import { sanitizeHtml, stripHtml } from '@/utils/sanitizeHtml'

// ==================== sanitizeHtml ====================
describe('sanitizeHtml', () => {
    it('passes plain text through unchanged', () => {
        expect(sanitizeHtml('Hello world')).toBe('Hello world')
    })

    it('keeps safe tags like <b>', () => {
        expect(sanitizeHtml('<b>bold</b>')).toBe('<b>bold</b>')
    })

    it('removes script tags', () => {
        const result = sanitizeHtml('<script>alert(1)</script>')
        expect(result).not.toContain('<script>')
        expect(result).not.toContain('alert(1)')
    })

    it('removes event handler attributes', () => {
        const result = sanitizeHtml('<img src="x" onerror="alert(1)">')
        expect(result).not.toContain('onerror')
    })

    it('removes or sanitizes javascript: protocol hrefs', () => {
        const result = sanitizeHtml('<a href="javascript:alert(1)">click</a>')
        expect(result).not.toContain('javascript:')
    })
})

// ==================== stripHtml ====================
describe('stripHtml', () => {
    it('strips tags and returns plain text', () => {
        expect(stripHtml('<p>Hello <b>world</b></p>')).toBe('Hello world')
    })

    it('returns plain text unchanged', () => {
        expect(stripHtml('just text')).toBe('just text')
    })

    it('returns empty string for empty input', () => {
        expect(stripHtml('')).toBe('')
    })

    it('returns empty or whitespace-trimmed string for tag-only input', () => {
        const result = stripHtml('<div><span></span></div>')
        expect(result.trim()).toBe('')
    })
})
