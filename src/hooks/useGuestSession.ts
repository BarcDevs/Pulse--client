import {
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
    const startedRef = useRef(false)
    const [hasFailed, setHasFailed] = useState(false)

    useEffect(() => {
        if (startedRef.current) return
        startedRef.current = true

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
    }, [router, queryClient])

    return {
        isReady: !!user?.isGuest,
        hasFailed
    }
}
