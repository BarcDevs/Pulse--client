import {queryClient} from '@/lib/queryClient'

import {getCsrfToken, getMe, login, logout, signup} from '@/api/auth'
import {store} from '@/store'
import {loginAction, logoutAction} from '@/store/authSlice'
import {removeTokenAction, setTokenAction} from '@/store/tokenSlice'
import {LoginSchema} from '@/validations/forms/loginSchema'
import {SignupSchema} from '@/validations/forms/signupSchema'

export const getCsrfTokenFromStore = () =>
    store.getState().token.token

export const handleLogin = async (
    credentials: LoginSchema
) => {
    const {data} = (await login(credentials)).data
    if (!data) return false

    store.dispatch(setTokenAction(data._csrf))

    const {data: meResponse} = await getMe()
    store.dispatch(loginAction({
        user: meResponse.data.user,
        remember: credentials.remember
    }))

    return true
}

export const handleSignup = async (
    userData: Omit<SignupSchema, 'confirmPassword'> & {
        confirmPassword?: string
    }
) => {
    delete userData.confirmPassword
    const {data} = (await signup(userData)).data

    return !!data
}

export const refreshAuthData = async () => {
    try {
        const [csrfRes, meRes] = await Promise.all([
            getCsrfToken(),
            getMe()
        ])

        const {data: csrfData} = csrfRes.data
        if (!csrfData) return false

        store.dispatch(setTokenAction(csrfData._csrf))
        store.dispatch(loginAction({
            user: meRes.data.data.user
        }))

        return true
    } catch (error: any) {
        if (error.response?.status === 401) {
            store.dispatch(removeTokenAction())
            store.dispatch(logoutAction())
            await queryClient.invalidateQueries()
        }
        return false
    }
}

export const handleLogout = async () => {
    try {
        await logout()
    } catch {
        // Continue with logout even if API call fails
    }

    store.dispatch(removeTokenAction())
    store.dispatch(logoutAction())

    await queryClient.invalidateQueries()
    queryClient.clear()
}