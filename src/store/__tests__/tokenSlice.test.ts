import { describe, expect, it } from 'vitest'

import tokenSlice, {
    removeTokenAction,
    setTokenAction
} from '@/store/tokenSlice'

// ==================== tokenSlice ====================
describe(
    'tokenSlice',
    () => {
        const initialState = { token: null }

        it(
            'should return the initial state',
            () => {
                const state = tokenSlice(
                    undefined,
                    { type: 'unknown' }
                )
                expect(state.token).toBeNull()
            })

        it(
            'should handle setToken',
            () => {
                const state = tokenSlice(
                    initialState,
                    setTokenAction('csrf-token-123')
                )
                expect(state.token)
                    .toBe('csrf-token-123')
            })

        it(
            'should handle removeToken',
            () => {
                const stateWithToken =
                    { token: 'existing-token' }
                const state = tokenSlice(
                    stateWithToken,
                    removeTokenAction()
                )
                expect(state.token).toBeNull()
            })

        it(
            'should replace existing token with setToken',
            () => {
                const stateWithToken =
                    { token: 'old-token' }
                const state = tokenSlice(
                    stateWithToken,
                    setTokenAction('new-token')
                )
                expect(state.token).toBe('new-token')
            })

        it(
            'should handle removeToken when already null',
            () => {
                const state = tokenSlice(
                    initialState,
                    removeTokenAction()
                )
                expect(state.token).toBeNull()
            })

        it(
            'should handle setToken with empty string',
            () => {
                const state = tokenSlice(
                    initialState,
                    setTokenAction('')
                )
                expect(state.token).toBe('')
            })
    })
