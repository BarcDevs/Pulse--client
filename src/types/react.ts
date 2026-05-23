import {
    Dispatch,
    HTMLProps,
    SetStateAction
} from 'react'

export type SetState<T> = Dispatch<SetStateAction<T>>
export type ClassName =
    HTMLProps<HTMLElement>['className']

export type OptimisticActionMap<T extends Record<string, object>> = {
    [K in keyof T]: { type: K } & T[K]
}[keyof T]
