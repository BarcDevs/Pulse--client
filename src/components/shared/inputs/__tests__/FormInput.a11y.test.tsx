import {
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { render, screen } from '@testing-library/react'

import { globalLocales } from '@/locales/globalLocales'

vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key
}))

import { FormInput } from '@/components/shared/inputs/FormInput'

describe('FormInput a11y', () => {
    it('names the password toggle', () => {
        render(
            <FormInput
                id={'pw'}
                type={'password'}
                onChange={vi.fn()}
            />
        )

        expect(
            screen.getByRole('button', {
                name: globalLocales.a11y.showPassword
            })
        ).toBeTruthy()
    })
})
