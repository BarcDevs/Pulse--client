import {
    describe,
    expect,
    it
} from 'vitest'

import { getTagName } from '@/utils/tag'

const slug = 'success-story'

describe('getTagName', () => {
    it('returns label for current lang', () => {
        const tag = {
            id: '1',
            slug,
            label: { en: 'Success Story', he: 'סיפור הצלחה' }
        }
        expect(getTagName(tag, 'he')).toBe('סיפור הצלחה')
        expect(getTagName(tag, 'en')).toBe('Success Story')
    })

    it('falls back to en when lang label is missing', () => {
        const tag = {
            id: '1',
            slug,
            label: { en: 'Success Story', he: '' }
        }
        expect(getTagName(tag, 'he')).toBe('Success Story')
    })

    it('falls back to slug when label is absent', () => {
        const tag = { id: '1', slug }
        expect(getTagName(tag, 'en')).toBe(slug)
        expect(getTagName(tag, 'he')).toBe(slug)
    })
})
