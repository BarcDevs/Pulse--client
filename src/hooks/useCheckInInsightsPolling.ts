import { useEffect, useRef } from 'react'

import type { CheckIn } from '@/types/checkIn'

import { timings } from '@/config/timings'

import { fetchCheckIns } from '@/api/checkIn'

type Params = {
    checkInId: string | null
    onReady: (checkIn: CheckIn) => void
    onStop: () => void
}

export const useCheckInInsightsPolling = ({
    checkInId,
    onReady,
    onStop
}: Params) => {
    const onReadyRef = useRef(onReady)
    const onStopRef = useRef(onStop)
    useEffect(() => {
        onReadyRef.current = onReady
        onStopRef.current = onStop
    })

    useEffect(() => {
        if (!checkInId) return

        let cancelled = false
        let timer: ReturnType<typeof setTimeout> | undefined
        const startedAt = Date.now()

        const finish = () => {
            cancelled = true
            onStopRef.current()
        }

        const poll = async () => {
            try {
                const [latest] = await fetchCheckIns(1)
                if (cancelled) return
                if (latest?.id === checkInId && latest.insightsStatus !== 'pending') {
                    onReadyRef.current(latest)
                    finish()
                    return
                }
            } catch {
                if (cancelled) return
            }
            if (Date.now() - startedAt >= timings.INSIGHTS_POLL_TIMEOUT) {
                finish()
                return
            }
            timer = setTimeout(poll, timings.INSIGHTS_POLL_INTERVAL)
        }

        timer = setTimeout(poll, timings.INSIGHTS_POLL_INTERVAL)

        return () => {
            cancelled = true
            clearTimeout(timer)
        }
    }, [checkInId])
}
