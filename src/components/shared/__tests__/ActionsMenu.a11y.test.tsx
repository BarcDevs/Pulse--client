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

import { ActionsMenu } from '@/components/shared/ActionsMenu'

describe('ActionsMenu a11y', () => {
    it('names the trigger', () => {
        render(
            <ActionsMenu
                onEditAction={vi.fn()}
                onDeleteAction={vi.fn()}
                isLoading={false}
                editLabel={'e'}
                deleteLabel={'d'}
                cancelLabel={'c'}
                confirmTitle={'t'}
                confirmDescription={'x'}
            />
        )

        expect(
            screen.getByRole('button', {
                name: globalLocales.a11y.moreActions
            })
        ).toBeTruthy()
    })
})
