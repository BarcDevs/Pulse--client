import { useEffect } from 'react'

import {
    getLaunchToken,
    markLaunchOpenSent
} from '@/utils/launchToken'

import { recordLaunchOpen } from '@/api/launchFunnel'

export const useRecordLaunchOpen = () => {
    useEffect(() => {
        const token = getLaunchToken(window.location.search)

        if (!token || !markLaunchOpenSent(token)) return

        recordLaunchOpen(token).catch(() => undefined)
    }, [])
}
