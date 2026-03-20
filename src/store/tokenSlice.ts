import {createSlice} from '@reduxjs/toolkit'

type TokenState = {
    token: string | null
}

const tokenSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null
    } as TokenState,

    reducers: {
        setToken: (_, {payload: token}: { payload: string }) => ({
            token
        }),

        removeToken: () => ({
            token: null
        })
    }
})

export default tokenSlice.reducer
export const {
    setToken: setTokenAction,
    removeToken: removeTokenAction
} = tokenSlice.actions
