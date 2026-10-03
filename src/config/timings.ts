import { secondInMs } from '@/constants/time'

/**
 * Timing constants for UI interactions, animations, and simulated API calls
 */

export const timings = {
    // Toast and notification durations
    TOAST_DURATION: 3 * secondInMs,
    INSIGHT_TOAST_DURATION: 30 * secondInMs,

    // Animation durations
    ANIMATION_DURATION_FAST: 0.3 * secondInMs,
    ANIMATION_DURATION_NORMAL: 0.5 * secondInMs,
    ANIMATION_DURATION_SLOW: secondInMs,

    // Retry delay while the backend/network is unreachable
    NETWORK_RETRY_DELAY: 10 * secondInMs,

    // Debounce and throttle delays
    DEBOUNCE_DELAY: 0.3 * secondInMs,
    THROTTLE_DELAY: 0.5 * secondInMs
} as const
