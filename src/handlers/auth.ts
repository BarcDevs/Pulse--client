// TODO: TanStack Query setup pending
// import {queryClient} from '@/lib/queryClient'

import config from '@/config'

import {signup} from '@/api/auth'
// TODO: Redux setup pending
// import {store} from '@/store'
// import {loginAction, logoutAction} from '@/store/authSlice'
// import {removeTokenAction, setTokenAction} from '@/store/tokenSlice'
import {SignupSchema} from '@/validations/forms/signupSchema'

// TODO: Redux setup pending
// export const getCsrfTokenFromStore = () =>
//     store.getState().token.token

// TODO: Redux and TanStack Query setup pending
// export const handleLogin = async (
//     credentials: LoginSchema
// ) => {
//     const {data} = (await login(credentials)).data
//     if (!data) return false

//     store.dispatch(setTokenAction(data._csrf))

//     const {data: meResponse} = await getMe()
//     store.dispatch(loginAction({
//         user: meResponse.data.user,
//         remember: credentials.remember
//     }))

//     return true
// }

// Temporary stubs
export const getCsrfTokenFromStore = () => null

export const handleLogin = async (...args: any[]): Promise<boolean> => {
    void args
    return false
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

// TODO: Redux and TanStack Query setup pending
// export const refreshAuthData = async () => {
//     try {
//         const [csrfRes, meRes] = await Promise.all([
//             getCsrfToken(),
//             getMe()
//         ])

//         const {data: csrfData} = csrfRes.data
//         if (!csrfData) return false

//         store.dispatch(setTokenAction(csrfData._csrf))
//         store.dispatch(loginAction({
//             user: meRes.data.data.user
//         }))

//         return true
//     } catch (error: any) {
//         if (error.response?.status === 401) {
//             store.dispatch(removeTokenAction())
//             store.dispatch(logoutAction())
//             await queryClient.invalidateQueries()
//         }
//         return false
//     }
// }

// TODO: Redux and TanStack Query setup pending
// export const handleLogout = async () => {
//     try {
//         await logout()
//     } catch {
//         // Continue with logout even if API call fails
//     }

//     store.dispatch(removeTokenAction())
//     store.dispatch(logoutAction())

//     await queryClient.invalidateQueries()
//     queryClient.clear()
// }

// Temporary stubs
export const refreshAuthData = async () => false

export const handleLogout = async () => {}

export const redirectToGoogleAuth = async () => {
    window.location.href = `${config.serverUrl}/api/v1/auth/google`
}