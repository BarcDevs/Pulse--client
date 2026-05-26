'use client'

import { useEffect, useState } from 'react'

import type {
    CheckIn,
    CheckInStats
} from '@/types/checkIn'

import {
    fetchCheckIns,
    fetchCheckInStats
} from '@/api/checkIn'

import { CheckInForm } from './forms/CheckInForm'
import { CheckInQuote } from './sections/Quote'
import { CheckInPageSkeletons } from './CheckInPageSkeletons'

export const CheckInPageContent = () => {
    const [latestCheckIn, setLatestCheckIn] =
        useState<CheckIn | null>(null)
    const [stats, setStats] =
        useState<CheckInStats | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            try {
                const [checkInsRes, statsRes] =
                    await Promise.all([
                        fetchCheckIns(1),
                        fetchCheckInStats()
                    ])
                setLatestCheckIn(checkInsRes[0] ?? null)
                setStats(statsRes)
            } catch (error) {
                console.error(
                    'Failed to load check-in data',
                    error
                )
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [])

    if (isLoading) return <CheckInPageSkeletons/>

    return (
        <div className={'space-y-6 p-6'}>
            <CheckInQuote/>
            <CheckInForm
                latestCheckIn={latestCheckIn}
                stats={stats}
            />
        </div>
    )
}
