import {combineReducers} from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import {configureStore} from '@reduxjs/toolkit'

import authSlice from '@/store/authSlice'
import tokenSlice from '@/store/tokenSlice'

const rootReducer = combineReducers({
    token: tokenSlice,
    auth: authSlice
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'token']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/PAUSE',
                    'persist/FLUSH',
                    'persist/PURGE',
                    'persist/REGISTER'
                ]
            }
        })
})

export const persistor = persistStore(store)

export type IRootState = ReturnType<typeof store.getState>
