import {useSelector} from 'react-redux'

import {User} from '@/types'

import {
    handleLogin,
    handleLogout,
    handleSignup
} from '@/handlers/auth'

import {IRootState} from '@/store'
import {
    LoginSchema
} from '@/validations/forms/loginSchema'
import {
    SignupSchema
} from '@/validations/forms/signupSchema'

export const useAuth = () => {
    const isLoggedIn =
        useSelector<IRootState>(state =>
            state.auth.isAuthenticated) as boolean

    const user =
        useSelector<IRootState>(state =>
            state.auth.user) as User | null

    const expiresAt =
        useSelector<IRootState>(state =>
            state.auth.expiresAt) as number | null

    /**
     * checks if the JWT token has expired
     */
    const checkAuth = async () => {
        if (expiresAt && Date.now() > expiresAt) {
            await logout()
        }
    }

    const login = async (
        credentials: LoginSchema
    ) => await handleLogin(credentials)

    const register = async (
        data: SignupSchema
    ) => await handleSignup(data)

    const logout = async () => {
        await handleLogout()
        window.location.reload()
    }

    return {
        user,
        isLoggedIn,
        checkAuth,
        login,
        logout,
        register
    }
}
