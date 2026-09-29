import {
    describe,
    expect,
    it
} from 'vitest'

import { passwordPattern } from '@/config/regex'

const asciiSpecialChars = [...' !"#$%&\'()*+,-./:;<=>?@[]^_`{|}~']

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
