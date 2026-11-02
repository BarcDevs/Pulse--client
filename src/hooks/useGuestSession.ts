import {
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react'

import { useRouter } from 'next/navigation'

import { useQueryClient } from '@tanstack/react-query'

import { isConflictError } from '@/utils/error'

import { authQueryKeys } from '@/constants/queryKeys'
import { ROUTES } from '@/constants/routes'

import { useAuth } from '@/context/AuthContext'

import { createGuest } from '@/api/auth'

// Signed-in visitors skip guest mode (the server answers 409)
export const useGuestSession = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { user } = useAuth()
    const [hasFailed, setHasFailed] = useState(false)

    const isInFlightRef = useRef(false)

    // One request at a time: a re-run effect or a double click must not
    // create a second guest
    const start = useCallback(() => {
        if (isInFlightRef.current) return
        isInFlightRef.current = true

        createGuest()
            .then(({ user: guest }) => queryClient.setQueryData(
                authQueryKeys.getMe,
                guest
            ))
            .catch((error: Error) => {
                if (isConflictError(error)) {
                    router.replace(ROUTES.DASHBOARD)
                    return
                }
                setHasFailed(true)
            })
            .finally(() => {
                isInFlightRef.current = false
            })
    }, [router, queryClient])

    const retry = () => {
        setHasFailed(false)
        start()
    }

    useEffect(start, [start])

    return {
        isReady: !!user?.isGuest,
        hasFailed,
        retry
    }
}
