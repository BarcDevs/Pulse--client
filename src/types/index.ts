import {ComponentProps, ReactNode} from 'react'

export type Prettify<T> = {
    [K in keyof T]: T[K];
} & unknown

export type LayoutProps = {
    children: ReactNode
}

export type Language = {
    name: string
    nativeName: string
    code: string
    dir: 'ltr' | 'rtl'
}

export type Role = 'USER' | 'ADMIN'

export type User = {
    id: string
    firstName: string
    lastName: string
    username: string
    email: string
    role: Role
}

export type PartialUser = {
    id: string
    firstName: string
    lastName: string
    username: string
}

export type InputProps = ComponentProps<'input'>