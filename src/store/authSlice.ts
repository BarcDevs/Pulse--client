import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {User} from '@/types'

import config from '@/config'

type AuthState = {
    isAuthenticated: boolean
    user: User | undefined
    expiresAt: number | null
}

type LoginPayload = {
    user: User
    remember?: boolean
}


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: undefined,
        expiresAt: null,
        remember: false
    } as AuthState,

    reducers: {
        login: (_, {payload}: PayloadAction<LoginPayload>) => ({
            isAuthenticated: true,
            user: payload.user,
            expiresAt: payload.remember ?
                Date.now() + config.loginDuration :
                null
        }),

        logout: () => ({
            isAuthenticated: false,
            user: undefined,
            expiresAt: null
        }),
    }
})

export default authSlice.reducer
export const {
    login: loginAction,
    logout: logoutAction
} = authSlice.actions
