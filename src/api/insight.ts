import type { TodayObservationResponse } from '@/types/insight'
import type { Response } from '@/types/responses'

import { api } from '@/api/index'
import { ENDPOINTS } from '@/api/routes'

export const fetchTodayObservation =
    async (): Promise<TodayObservationResponse | null> => {
        const res = await api
            .get<Response<TodayObservationResponse | null>>(
                ENDPOINTS.insight.observation
            )
        return res.data.data
    }
