'use client'

import { useEffect } from 'react'

import { isDev } from '@/config'

const SERVICE_WORKER_PATH = '/sw.js'

export const ServiceWorkerRegister = () => {
    useEffect(() => {
        if (!('serviceWorker' in navigator)) return

        if (isDev) {
            navigator.serviceWorker
                .getRegistrations()
                .then((registrations) => registrations.forEach((registration) => registration.unregister()))
            return
        }

        navigator.serviceWorker.register(SERVICE_WORKER_PATH)
    }, [])

    return null
}
