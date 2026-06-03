import {
    Dispatch,
    HTMLProps,
    ReactNode,
    SetStateAction
} from 'react'

export type SetState<T> = Dispatch<SetStateAction<T>>
export type ClassName =
    HTMLProps<HTMLElement>['className']

export type LayoutProps = {
    children: ReactNode
}

export type ContextProps = {
    children?: ReactNode
}

export type WrapperProps = {
    children: ReactNode
}

export type OptimisticActionMap<T extends Record<string, object>> = {
    [K in keyof T]: { type: K } & T[K]
}[keyof T]
