import {
    describe,
    expect,
    it
} from 'vitest'

import {
    isTrustedImageUrl,
    replaceUntrustedImages
} from '@/utils/trustedImages'

// ==================== isTrustedImageUrl ====================
describe(
    'isTrustedImageUrl',
    () => {
        it.each([
            '/logos/pic.png',
            `${window.location.origin}/pic.png`,
            'https://lh3.googleusercontent.com/a/pic.png'
        ])(
            'allows %s',
            (src) => {
                expect(isTrustedImageUrl(src)).toBe(true)
            })

        it.each([
            'https://tracker.example/pixel.png',
            '//tracker.example/pixel.png',
            'http://lh3.googleusercontent.com/a/pic.png',
            'data:image/png;base64,AAAA',
            '',
            null,
            undefined
        ])(
            'rejects %s',
            (src) => {
                expect(isTrustedImageUrl(src)).toBe(false)
            })
    })

// ==================== replaceUntrustedImages ====================
describe(
    'replaceUntrustedImages',
    () => {
        it(
            'keeps trusted images',
            () => {
                const html = '<p><img src="https://lh3.googleusercontent.com/a/pic.png"></p>'
                expect(replaceUntrustedImages(html)).toContain('<img')
            })

        it(
            'turns an untrusted https image into a link',
            () => {
                const result = replaceUntrustedImages(
                    '<p><img src="https://tracker.example/pixel.png" alt="photo"></p>'
                )
                expect(result).not.toContain('<img')
                expect(result).toContain('href="https://tracker.example/pixel.png"')
                expect(result).toContain('>photo</a>')
            })

        it(
            'keeps only the alt text of a non-https image',
            () => {
                const result = replaceUntrustedImages(
                    '<p><img src="http://tracker.example/pixel.png" alt="photo"></p>'
                )
                expect(result).toBe('<p>photo</p>')
            })

        it(
            'leaves html without images untouched',
            () => {
                expect(replaceUntrustedImages('<p>hi</p>')).toBe('<p>hi</p>')
            })
    })
