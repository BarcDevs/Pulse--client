'use client'

import {
    ReactNode,
    useEffect,
    useState
} from 'react'

type ToastActionElement = ReactNode

type ToastProps = {
    open?: boolean
    onOpenChange?: (
        open: boolean
    ) => void
}

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
    id: string
    title?: ReactNode
    description?: ReactNode
    action?: ToastActionElement
}

type ActionType = {
    ADD_TOAST: 'ADD_TOAST'
    UPDATE_TOAST: 'UPDATE_TOAST'
    DISMISS_TOAST: 'DISMISS_TOAST'
    REMOVE_TOAST: 'REMOVE_TOAST'
}

let count = 0

const genId = () => {
    count =
        (count + 1) % Number.MAX_SAFE_INTEGER
    return count.toString()
}

type Action =
    {
        type: ActionType['ADD_TOAST']
        toast: ToasterToast
    } |
    {
        type: ActionType['UPDATE_TOAST']
        toast: Partial<ToasterToast>
    } |
    {
        type: ActionType['DISMISS_TOAST']
        toastId?: ToasterToast['id']
    } |
    {
        type: ActionType['REMOVE_TOAST']
        toastId?: ToasterToast['id']
    }

type State = {
    toasts: ToasterToast[]
}

type TimeoutMap = Map<
    string,
    ReturnType<typeof setTimeout>
>

const toastTimeouts: TimeoutMap = new Map()

const addToRemoveQueue = (
    toastId: string
) => {
    const hasTimeout =
        toastTimeouts.has(toastId)

    if (hasTimeout) {
        return
    }

    const timeout = setTimeout(() => {
        toastTimeouts.delete(toastId)
        dispatch({
            type: 'REMOVE_TOAST',
            toastId
        })
    }, TOAST_REMOVE_DELAY)

    toastTimeouts.set(toastId, timeout)
}

export const reducer = (
    state: State,
    action: Action
): State => {
    switch (action.type) {
        case 'ADD_TOAST': {
            const newToasts = [
                action.toast,
                ...state.toasts
            ].slice(0, TOAST_LIMIT)

            return {
                ...state,
                toasts: newToasts
            }
        }

        case 'UPDATE_TOAST': {
            const toasts = state.toasts.map(
                (t) =>
                    t.id === action.toast.id ? {
                        ...t,
                        ...action.toast
                    } : t
            )

            return {
                ...state,
                toasts
            }
        }

        case 'DISMISS_TOAST': {
            const { toastId } = action

            if (toastId) {
                addToRemoveQueue(toastId)
            } else {
                state.toasts.forEach(
                    (toast) => {
                        addToRemoveQueue(
                            toast.id
                        )
                    })
            }

            const toasts = state.toasts.map(
                (t) =>
                    t.id === toastId
                    || toastId === undefined
                        ? {
                            ...t,
                            open: false
                        }
                        : t
            )

            return {
                ...state,
                toasts
            }
        }

        case 'REMOVE_TOAST': {
            if (
                action.toastId === undefined
            ) {
                return {
                    ...state,
                    toasts: []
                }
            }

            const toasts =
                state.toasts.filter(
                    (t) => t.id !== action.toastId
                )

            return {
                ...state,
                toasts
            }
        }
    }
}

type StateListener = (state: State) => void

const listeners: StateListener[] = []

let memoryState: State = { toasts: [] }

const dispatch = (action: Action) => {
    memoryState = reducer(memoryState, action)
    listeners.forEach((listener) => {
        listener(memoryState)
    })
}

type Toast = Omit<ToasterToast, 'id'>

const toast = ({ ...props }: Toast) => {
    const id = genId()

    const update = (props: ToasterToast) =>
        dispatch({
            type: 'UPDATE_TOAST',
            toast: { ...props, id }
        })

    const dismiss = () =>
        dispatch({
            type: 'DISMISS_TOAST',
            toastId: id
        })

    dispatch({
        type: 'ADD_TOAST',
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open) => {
                if (!open) dismiss()
            }
        }
    })

    return {
        id,
        dismiss,
        update
    }
}

const useToast = () => {
    const [state, setState] =
        useState<State>(memoryState)

    useEffect(() => {
        listeners.push(setState)

        return () => {
            const index = listeners.indexOf(
                setState
            )

            if (index > -1) {
                listeners.splice(index, 1)
            }
        }
    }, [state])

    return {
        ...state,
        toast,
        dismiss: (toastId?: string) =>
            dispatch({
                type: 'DISMISS_TOAST',
                toastId
            })
    }
}

export { toast, useToast }
