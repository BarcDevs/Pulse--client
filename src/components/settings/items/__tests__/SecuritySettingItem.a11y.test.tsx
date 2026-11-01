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

import { SecuritySettingItem } from '@/components/settings/items/SecuritySettingItem'

describe('SecuritySettingItem a11y', () => {
    it('names the edit button', () => {
        render(
            <SecuritySettingItem
                icon={null}
                label={'label'}
                value={'value'}
                onClickAction={vi.fn()}
            />
        )

        expect(
            screen.getByRole('button', {
                name: globalLocales.a11y.edit
            })
        ).toBeTruthy()
    })
})
