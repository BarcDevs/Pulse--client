import enMessages from '../../../messages/en-US.json'
import heMessages from '../../../messages/he-IL.json'
import { globalLocales } from '../globalLocales'

const landingButtonNames = [
    'login',
    'signUp'
]

const landingKeys = landingButtonNames.map(
    (name) => `global.landing.buttons.${name}`
)

const resolveMessage = (
    messages: Record<string, unknown>,
    key: string
) =>
    key
        .split('.')
        .reduce<unknown>(
            (node, part) =>
                (node as Record<string, unknown>)?.[part],
            messages
        )

describe('globalLocales.landing', () => {
    it('only keeps the keys the landing navbar reads', () => {
        expect(globalLocales.landing).toEqual({
            buttons: Object.fromEntries(
                landingButtonNames.map((name, index) => [
                    name,
                    landingKeys[index]
                ])
            )
        })
    })

    it.each([
        [
            'en-US',
            enMessages
        ],
        [
            'he-IL',
            heMessages
        ]
    ])('has the same landing messages in %s', (_, messages) => {
        const landing = resolveMessage(
            messages,
            'global.landing'
        )
        expect(Object.keys(landing as object)).toEqual([
            'buttons'
        ])
        landingKeys.forEach((key) =>
            expect(typeof resolveMessage(messages, key)).toBe(
                'string'
            )
        )
        expect(
            Object.keys(
                (landing as { buttons: object }).buttons
            ).sort()
        ).toEqual([...landingButtonNames].sort())
    })
})
