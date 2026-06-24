import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { searchLocations } from '@/lib/location/searchLocations'

describe('searchLocations', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn())
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('maps display_name results to LocationSuggestion labels', async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => [
                { display_name: 'Tel Aviv, Israel' },
                { display_name: 'Tel Aviv District, Israel' }
            ]
        } as Response)

        const results = await searchLocations('Tel Aviv')

        expect(results).toEqual([
            { label: 'Tel Aviv, Israel' },
            { label: 'Tel Aviv District, Israel' }
        ])
    })

    it('encodes the query in the request URL', async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => []
        } as Response)

        await searchLocations('New York')

        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('q=New%20York'),
            expect.anything()
        )
    })

    it('returns an empty array when the response is not ok', async () => {
        vi.mocked(fetch).mockResolvedValue({ ok: false } as Response)

        const results = await searchLocations('nowhere')

        expect(results).toEqual([])
    })
})
