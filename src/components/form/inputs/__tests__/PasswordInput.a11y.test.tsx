import {
    describe,
    expect,
    it,
    vi
} from 'vitest'

import {
    fireEvent,
    render,
    screen
} from '@testing-library/react'

import { globalLocales } from '@/locales/globalLocales'

vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key
}))

vi.mock('@/components/ui/form', () => ({
    FormControl: ({ children }: any) => <>{children}</>,
    FormLabel: ({ children }: any) => <>{children}</>,
    FormDescription: ({ children }: any) => <>{children}</>
}))

import { PasswordInput } from '@/components/form/inputs/PasswordInput'

describe('PasswordInput a11y', () => {
    it('names the toggle show then hide', () => {
        render(
            <PasswordInput
                field={{ name: 'password' } as any}
                config={{} as any}
            />
        )

        const show = screen.getByRole('button', {
            name: globalLocales.a11y.showPassword
        })

        fireEvent.click(show)

        expect(
            screen.getByRole('button', {
                name: globalLocales.a11y.hidePassword
            })
        ).toBeTruthy()
    })
})
