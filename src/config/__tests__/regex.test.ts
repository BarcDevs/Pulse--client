import {
    describe,
    expect,
    it
} from 'vitest'

import {
    passwordPattern,
    passwordSpecialCharPattern
} from '@/config/regex'

const asciiSpecialChars = [...' !"#$%&\'()*+,-./:;<=>?@[]^_`{|}~']

describe(
    'passwordSpecialCharPattern',
    () => {
        it.each(asciiSpecialChars)(
            'should match special character %j',
            (char) => {
                expect(passwordSpecialCharPattern.test(`abc1${char}`)).toBe(true)
            })

        it(
            'should not match letters and digits only',
            () => {
                expect(passwordSpecialCharPattern.test('Abcdef123')).toBe(false)
            })
    })

describe(
    'passwordPattern',
    () => {
        it.each(asciiSpecialChars)(
            'should accept a password containing %j',
            (char) => {
                expect(passwordPattern.test(`Abcdef1${char}`)).toBe(true)
            })

        it.each([
            ['no digit', 'Abcdefgh!'],
            ['no letter', '12345678!'],
            ['too short', 'Ab1!']
        ])(
            'should reject a password with %s',
            (_label, password) => {
                expect(passwordPattern.test(password)).toBe(false)
            })
    })
