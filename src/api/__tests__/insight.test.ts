import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

vi.mock(
    '@/api/index',
    () => ({
        api: {
            get: vi.fn()
        }
    })
)

import { ENDPOINTS } from '@/api/routes'
import { fetchTodayObservation } from '@/api/insight'
import { api } from '@/api/index'

describe('insight API', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('fetchTodayObservation', () => {
        it('calls GET on the observation endpoint', async () => {
            vi.mocked(api.get).mockResolvedValueOnce({
                data: { data: null }
            })

            await fetchTodayObservation()
            expect(api.get).toHaveBeenCalledWith(ENDPOINTS.insight.observation)
        })

        it('returns the data payload from the response', async () => {
            const observation = {
                id: 'obs-1',
                summary: 'Feeling good'
            }
            vi.mocked(api.get).mockResolvedValueOnce({
                data: { data: observation }
            })

            const result = await fetchTodayObservation()
            expect(result).toEqual(observation)
        })

        it('returns null when server has no observation', async () => {
            vi.mocked(api.get).mockResolvedValueOnce({
                data: { data: null }
            })

            const result = await fetchTodayObservation()
            expect(result).toBeNull()
        })

        it('propagates network errors', async () => {
            vi.mocked(api.get).mockRejectedValueOnce(new Error('Network Error'))
            await expect(fetchTodayObservation()).rejects.toThrow('Network Error')
        })
    })
})
