import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
    fireEvent,
    render,
    screen,
    waitFor
} from '@testing-library/react'

import { SupportContact } from '@/components/support/SupportContact'

const sendSupportMessage = vi.fn()
const setNetworkError = vi.fn()
let mockUser: { id: string } | null = null

vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key
}))

vi.mock('@/api/support', () => ({
    sendSupportMessage: (data: unknown) => sendSupportMessage(data)
}))

vi.mock('@/context/AuthContext', () => ({
    useAuth: () => ({
        user: mockUser,
        setNetworkError
    })
}))

const renderContact = () =>
    render(
        <QueryClientProvider client={new QueryClient()}>
            <SupportContact/>
        </QueryClientProvider>
    )

describe('SupportContact', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        mockUser = null
    })

    it('asks logged-out users for an email', () => {
        renderContact()

        expect(screen.getByText('support.contact.emailLabel')).toBeTruthy()
    })

    it('does not ask logged-in users for an email', () => {
        mockUser = { id: 'u1' }
        renderContact()

        expect(screen.queryByText('support.contact.emailLabel')).toBeNull()
    })

    it('keeps send disabled until a message is written', () => {
        mockUser = { id: 'u1' }
        renderContact()

        const send = screen.getByText('support.contact.send') as HTMLButtonElement

        expect(send.disabled).toBe(true)
    })

    it('sends the topic and message and shows the sent state', async () => {
        mockUser = { id: 'u1' }
        sendSupportMessage.mockResolvedValue(undefined)
        renderContact()

        fireEvent.change(
            screen.getByPlaceholderText('support.contact.messagePlaceholder'),
            { target: { value: 'I need help' } }
        )
        fireEvent.click(screen.getByText('support.contact.topics.billing'))
        fireEvent.click(screen.getByText('support.contact.send'))

        await waitFor(() => expect(sendSupportMessage).toHaveBeenCalledTimes(1))
        expect(sendSupportMessage.mock.calls[0][0]).toMatchObject({
            topic: 'billing',
            message: 'I need help'
        })
        await screen.findByText('support.contact.sent.title')
    })

    it('shows the rate-limit message on 429', async () => {
        mockUser = { id: 'u1' }
        sendSupportMessage.mockRejectedValue(
            Object.assign(new Error('Too many'), {
                isAxiosError: true,
                response: { status: 429 }
            })
        )
        renderContact()

        fireEvent.change(
            screen.getByPlaceholderText('support.contact.messagePlaceholder'),
            { target: { value: 'hello' } }
        )
        fireEvent.click(screen.getByText('support.contact.send'))

        await screen.findByText('support.contact.errors.rateLimited')
    })
})
