/**
 * Timing constants for UI interactions, animations, and simulated API calls
 */

export const timings = {
    // Authentication page simulated API call delays
    AUTH_API_DELAY: 1000,

    // Toast and notification durations
    TOAST_DURATION: 3000,

    // Animation durations
    ANIMATION_DURATION_FAST: 300,
    ANIMATION_DURATION_NORMAL: 500,
    ANIMATION_DURATION_SLOW: 1000,

    // Debounce and throttle delays
    DEBOUNCE_DELAY: 300,
    THROTTLE_DELAY: 500
} as const