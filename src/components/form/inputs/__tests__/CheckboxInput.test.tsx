import { NextIntlClientProvider } from 'next-intl'

import { useForm } from 'react-hook-form'
import {
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { render } from '@testing-library/react'

import { DynamicFormField } from '@/components/form/DynamicFormField'
import { Form } from '@/components/ui/form'

vi.mock('@/context/AuthContext', () => ({
    useAuth: () => ({ user: null })
}))

const LABEL_KEY = 'auth.signup.acceptTerms'

const messages = {
    auth: {
        signup: {
            acceptTerms: 'By signing up, I accept the <terms>Terms of Service</terms>'
        }
    }
}

const Harness = () => {
    const form = useForm({ defaultValues: { acceptTerms: false } })

    return (
        <NextIntlClientProvider
            locale={'en-US'}
            messages={messages}
        >
            <Form {...form}>
                <DynamicFormField
                    name={'acceptTerms'}
                    control={form.control}
                    config={{ type: 'checkbox', label: LABEL_KEY }}
                />
            </Form>
        </NextIntlClientProvider>
    )
}

describe('CheckboxInput', () => {
    it('renders a label with a link tag as text plus a link, not the message key', () => {
        const { container } = render(<Harness/>)

        expect(container.textContent)
            .toContain('By signing up, I accept the Terms of Service')
        expect(container.textContent).not.toContain(LABEL_KEY)

        const link = container.querySelector('a')

        expect(link?.getAttribute('href')).toBe('/terms')
        expect(link?.getAttribute('target')).toBe('_blank')
    })
})
