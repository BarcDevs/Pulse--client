import {
    ParsedLocation,
    redirect
} from '@tanstack/react-router'

import {ROUTES} from '@/constants/routes'

import {store} from '@/store'

export const validateUser = ({ location }: {
    location: ParsedLocation
}) => {
    const state = store.getState()

    if (!state.auth.isAuthenticated) {
        throw redirect({
            to: ROUTES.LOGIN,
            search: {
                redirect: location.pathname
            }
        })
    }
}
