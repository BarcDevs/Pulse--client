import {
    describe,
    expect,
    it
} from 'vitest'

import { hasSimpleRun } from '@/utils/password'

// ==================== hasSimpleRun ====================
describe(
    'hasSimpleRun',
    () => {
        it.each([
            'xx1234yy',
            'xx4321yy',
            'xxabcdyy',
            'xxDCBAyy',
            'xxaaaayy',
            'xx!!!!yy',
            'xx0000yy'
        ])(
            'flags %s',
            (password) => {
                expect(hasSimpleRun(password)).toBe(true)
            })

        it.each([
            'Password123!',
            'xx123yy',
            'xxabcyy',
            'xxaaayy',
            'a1b2c3d4',
            'xx9012yy',
            'xxyz01ab'
        ])(
            'allows %s',
            (password) => {
                expect(hasSimpleRun(password)).toBe(false)
            })
    })
